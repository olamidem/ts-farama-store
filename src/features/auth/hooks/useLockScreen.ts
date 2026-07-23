import { useAuthStore } from "../store/authStore";

export const useLockScreen = () => {
  const isLocked = useAuthStore((state) => state.isLocked);
  const setLocked = useAuthStore((state) => state.setLocked);
  
  const lock = () => setLocked(true);
  const unlock = () => setLocked(false);
  const toggleLock = () => setLocked(!isLocked);

  return {
    isLocked,
    lock,
    unlock,
    toggleLock,
  };
};

export default useLockScreen;