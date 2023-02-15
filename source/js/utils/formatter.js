const formatMoneyWithDecimal = (value, decimalCount = 0) => {
  let numberFormatted = formatNumberToDecimalReturnsZero(value, decimalCount);
  const splittedNumber = numberFormatted.toString().split('.');
  return splittedNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (splittedNumber[1] ? '.' + splittedNumber[1] : '');
};

const formatNumberToDecimalReturnsZero = (value, decimalCount = 0) => {
  value = (`${value}`).replace(/ /g, '').replace(',', '.');
  return isNaN(+value) ? '0.0' : toFixed(+value, decimalCount);
};

const toFixed = (number, decimals) => {
  const x = Math.pow(10, Number(decimals) + 1);
  return (Number(number) + (1 / x)).toFixed(decimals);
};

const formatStringToNumber = (val) => {
  if (!val) {
    return 0;
  }

  val = deleteExtraDotsFromNumberStr(val);

  return parseFloat(`${val}`.replace(/\s/g, ''));
};

const deleteExtraDotsFromNumberStr = (value) => {
  value = (`${value}`).replace(/ /g, '').replace(/,/g, '.');

  return value;
};

export {formatStringToNumber, formatMoneyWithDecimal};
