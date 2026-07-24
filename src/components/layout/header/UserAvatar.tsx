interface UserAvatarProps {
  profile?: {
    avatar_url?: string | null;
    avatar_color?: string | null;
    full_name?: string | null;
  } | null;
  user?: {
    email?: string | null;
  } | null;
}

export const UserAvatar = ({ profile, user }: UserAvatarProps) => {
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "OP";
  };

  if (profile?.avatar_url) {
    return (
      <img
        src={profile.avatar_url}
        alt="User profile"
        className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-100 shrink-0 shadow-xs"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div
      style={{ backgroundColor: profile?.avatar_color || "#4f46e5" }}
      className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-black text-white tracking-widest shadow-xs shrink-0"
    >
      {getInitials()}
    </div>
  );
};
