export const formatSentenceCase = (value: string): string => {
  const text = value.trim();
  if (!text) {
    return "";
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
