// A simple component that takes a number and formats it with commas for thousands separators.
const PriceDisplay = ({ price }) => {
  // Create a number formatter for the US locale
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return <span>{formatter.format(price)}</span>;
};

export default PriceDisplay;
