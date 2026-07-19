export const formatCurrency = (
  amount: number | undefined,
  locale = "en-NG",
  currency = "NGN",
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount ?? 0);
};
