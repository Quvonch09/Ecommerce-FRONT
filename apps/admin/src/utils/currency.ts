export const formatCurrency = (value: number, currency = 'UZS', locale = 'uz-UZ') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value || 0);
