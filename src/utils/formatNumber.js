const formatNumber = (number, showDecimals = false, locale = 'en-US') => {
  const format = (n) => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: showDecimals ? 1 : 0,
      maximumFractionDigits: showDecimals ? 1 : 0,
    }).format(n);
  };

  if (Math.abs(number) >= 1.0e9) {
    return format(number / 1.0e9) + 'B';
  }
  if (Math.abs(number) >= 1.0e6) {
    return format(number / 1.0e6) + 'M';
  }
  if (Math.abs(number) >= 1.0e3) {
    return format(number / 1.0e3) + 'K';
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(number);
};

export default formatNumber;
