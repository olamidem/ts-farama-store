import type { Profile } from "../../../features/auth/types/profile";
import { cn } from "../../../utils/cn";

interface UserAvatarProps {
  profile?: Profile | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

const UserAvatar = ({
  profile,
  size = "md",
  className,
}: UserAvatarProps) => {
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }

    return profile?.email?.[0]?.toUpperCase() || "OP";
  };

  if (profile?.avatar_url) {
    return (
      <img
        src={profile.avatar_url}
        alt={profile.full_name ?? "User Avatar"}
        referrerPolicy="no-referrer"
        className={cn(
          "rounded-full object-cover ring-2 ring-slate-100 shadow-sm",
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      style={{
        backgroundColor: profile?.avatar_color || "#4f46e5",
      }}
      className={cn(
        "rounded-full flex items-center justify-center font-black tracking-wide text-white shadow-sm ring-2 ring-slate-100",
        sizeClasses[size],
        className
      )}
    >
      {getInitials()}
    </div>
  );
};

export default UserAvatar;