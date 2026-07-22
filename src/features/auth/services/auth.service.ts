import { supabase } from "../../../api/supabase";
import type { User } from "@supabase/supabase-js";
import type { LoginRequest } from "../types/auth";
import type { Profile } from "../types/profile";

/**
 * Log in with email and password
 */
export const login = async ({ email, password }: LoginRequest) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * Log out of the current session
 */
export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Retrieve the current authenticated Supabase user
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return user;
};

/**
 * Retrieve the profile, role, and permissions of a given user ID
 */
export const getCurrentProfile = async (userId: string, email?: string): Promise<Profile | null> => {
  const { data: initialData, error } = await supabase
    .from("profiles")
    .select(`
      *,
      role:roles (
        id,
        name,
        description,
        role_permissions (
          permission:permissions (
            id,
            module,
            action,
            code
          )
        )
      )
    `)
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.warn("Could not retrieve profile:", error);
    return null;
  }

  let data = initialData;

  // Auto-create/upsert the profile row if it's missing (e.g. created from the Supabase dashboard Auth tab)
  if (!data) {
    console.log("Profile missing for user", userId, "- auto-creating profile row.");
    
    // Find available roles from DB to assign a reasonable default role
    const { data: roles } = await supabase.from("roles").select("id, name");
    let defaultRoleId = null;
    if (roles && roles.length > 0) {
      // Prioritize an admin or manager-level role if available, or fallback to the first role
      const adminRole = roles.find((r: { id: string; name: string }) => 
        r.name.toLowerCase().includes("admin") || 
        r.name.toLowerCase().includes("super") ||
        r.name.toLowerCase().includes("manager")
      );
      defaultRoleId = adminRole ? adminRole.id : roles[0].id;
    }

    const defaultProfile = {
      id: userId,
      full_name: email ? email.split("@")[0] : "New User",
      email: email || "",
      phone: "",
      avatar_url: "",
      avatar_color: "#8b5cf6",
      status: "active",
      role_id: defaultRoleId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error: insertError } = await supabase
      .from("profiles")
      .insert(defaultProfile);

    if (insertError) {
      console.warn("Failed to auto-create profile row:", insertError);
      return null;
    }

    // Retrieve again after insertion
    const { data: newData, error: fetchError } = await supabase
      .from("profiles")
      .select(`
        *,
        role:roles (
          id,
          name,
          description,
          role_permissions (
            permission:permissions (
              id,
              module,
              action,
              code
            )
          )
        )
      `)
      .eq("id", userId)
      .single();

    if (fetchError) {
      console.warn("Failed to retrieve newly created profile:", fetchError);
      return null;
    }

    data = newData;
  }

  return data as Profile;
};

/**
 * Validate standard PIN against user's profile pin_hash
 */
export const unlockWithPin = async (userId: string, pin: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("pin_hash")
    .eq("id", userId)
    .single();

  if (error || !data) {
    throw new Error("Unable to locate profile details.");
  }

  if (!data.pin_hash) {
    throw new Error("PIN protection has not been set up for this operator account.");
  }

  // 1. Plaintext Comparison
  if (data.pin_hash === pin) {
    return true;
  }

  // 2. SHA-256 Comparison
  try {
    const encoder = new TextEncoder();
    const pinData = encoder.encode(pin);
    const hashBuffer = await crypto.subtle.digest("SHA-256", pinData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPin = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    
    if (data.pin_hash === hashedPin) {
      return true;
    }
  } catch (err) {
    console.warn("Could not compute hash:", err);
  }

  return false;
};

/**
 * Update operator profile details
 */
export const updateProfile = async (
  userId: string,
  updates: Partial<Profile>
): Promise<Profile> => {
  // Strip non-column/relational fields like role before updating the database
  const allowedUpdates = { ...updates };
  delete (allowedUpdates as Record<string, unknown>).role;

  const { error } = await supabase
    .from("profiles")
    .update({
      ...allowedUpdates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  // Retrieve the full profile with roles and permissions safely
  const updatedProfile = await getCurrentProfile(userId, updates.email ?? undefined);
  if (!updatedProfile) {
    throw new Error("Unable to retrieve the updated profile.");
  }

  return updatedProfile;
};

/**
 * Update terminal access PIN
 */
export const updatePin = async (userId: string, plainPin: string): Promise<void> => {
  const encoder = new TextEncoder();
  const pinData = encoder.encode(plainPin);
  const hashBuffer = await crypto.subtle.digest("SHA-256", pinData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPin = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  const { error } = await supabase
    .from("profiles")
    .update({
      pin_hash: hashedPin,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }
};

