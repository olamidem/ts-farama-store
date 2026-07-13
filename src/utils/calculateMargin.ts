export const calculateMargin = (
  cost: number,
  selling: number
) => {
  const margin = selling - cost;

  const percentage =
    cost > 0
      ? (margin / cost) * 100
      : 0;

  return {
    margin,
    percentage,
  };
};