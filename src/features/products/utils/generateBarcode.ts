export const generateBarcode = (): string => {
  const timestamp = Date.now().toString(); // 13 digits currently

  // Ensure exactly 13 numeric digits
  return timestamp.padStart(13, "0").slice(-13);
};
