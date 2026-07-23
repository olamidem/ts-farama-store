import type { Profile } from "../types/profile";

interface UserAvatarProps {
  profile: Profile | null;
}

const UserAvatar = ({ profile }: UserAvatarProps) => {
  const initials =
    profile?.full_name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "OP";

  if (profile?.avatar_url) {
    return (
      <img
        src={profile.avatar_url}
        referrerPolicy="no-referrer"
        className="h-20 w-20 rounded-full border-4 border-indigo-500/20 object-cover"
      />
    );
  }

  return (
    <div
      style={{
        backgroundColor:
          profile?.avatar_color ?? "#4f46e5",
      }}
      className="flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold"
    >
      {initials}
    </div>
  );
};

export default UserAvatar;