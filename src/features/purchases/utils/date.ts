export const getToday = () => new Date().toISOString().split("T")[0];

export const getFutureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};
