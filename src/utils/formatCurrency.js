import { getCurrencyByCode } from './currencies';

export const formatCurrency = (amount, code = 'USD') => {
  const currencyInfo = getCurrencyByCode(code);
  
  return new Intl.NumberFormat(currencyInfo.locale, {
    style: 'currency',
    currency: currencyInfo.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
