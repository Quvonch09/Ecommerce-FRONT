export const formatCurrency = (
  amount: number,
  currency: string = 'UZS',
  locale: string = 'uz-UZ',
) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount || 0);
