const formatNumber = (number, showDecimals = false, locale = 'en-US') => {
  const format = (n, decimals) => {
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n);

    // Remove trailing zeros and dot/comma if needed
    return formatted.replace(/([.,]0+)$|([.,]\d*[1-9])0+$/, '$2');
  };

  if (Math.abs(number) >= 1.0e9) {
    return format(number / 1.0e9, 2) + 'B';
  }
  if (Math.abs(number) >= 1.0e6) {
    return format(number / 1.0e6, 2) + 'M';
  }
  if (Math.abs(number) >= 1.0e3) {
    return format(number / 1.0e3, 2) + 'K';
  }

  return format(number, showDecimals ? 2 : 0);
};

export default formatNumber;
