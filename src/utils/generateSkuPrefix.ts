export const generateSkuPrefix = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return "";
  }
  // Single word
  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase();
  }
  // Multiple words
  return words
    .map((word) => word[0])
    .join("")
    .slice(0, 5)
    .toUpperCase();
};
