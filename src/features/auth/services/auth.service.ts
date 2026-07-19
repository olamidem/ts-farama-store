import { supabase } from "../../../api/supabase";
import type { User } from "@supabase/supabase-js";
import type { LoginRequest } from "../types/auth";

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

export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

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
