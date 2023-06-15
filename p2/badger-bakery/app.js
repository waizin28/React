const SALES_TAX = {
  AL: 0.04,
  AK: 0.0,
  AZ: 0.056,
  AR: 0.065,
  CA: 0.073,
  CO: 0.029,
  CT: 0.064,
  DE: 0.0,
  DC: 0.06,
  FL: 0.06,
  GA: 0.04,
  HI: 0.04,
  ID: 0.06,
  IL: 0.063,
  IN: 0.07,
  IA: 0.06,
  KS: 0.065,
  KY: 0.06,
  LA: 0.045,
  ME: 0.055,
  MD: 0.06,
  MA: 0.063,
  MI: 0.06,
  MN: 0.069,
  MS: 0.07,
  MO: 0.042,
  MT: 0.0,
  NE: 0.055,
  NV: 0.069,
  NH: 0.0,
  NJ: 0.066,
  NM: 0.051,
  NY: 0.04,
  NC: 0.048,
  ND: 0.05,
  OH: 0.058,
  OK: 0.045,
  OR: 0.0,
  PA: 0.06,
  RI: 0.07,
  SC: 0.06,
  SD: 0.045,
  TN: 0.07,
  TX: 0.063,
  UT: 0.061,
  VT: 0.06,
  VA: 0.053,
  WA: 0.065,
  WV: 0.06,
  WI: 0.05,
  WY: 0.04,
};

function roundMoney(num) {
  return Math.round(num * 100) / 100;
}

function calculateSubtotal() {
  const bagelQuantity = parseInt(
    document.getElementById("bagelQuantity").value
  );
  const donutQuantity = parseInt(
    document.getElementById("donutQuantity").value
  );
  const muffinQuantity = parseInt(
    document.getElementById("muffinQuantity").value
  );
  const pieQuantity = parseInt(document.getElementById("pieQuantity").value);
  const cakeQuantity = parseInt(document.getElementById("cakeQuantity").value);

  const totalCost =
    1.5 * bagelQuantity +
    1.0 * donutQuantity +
    2.0 * muffinQuantity +
    4.5 * pieQuantity +
    7.0 * cakeQuantity;

  return parseFloat(totalCost.toFixed(2));
}

function calculateSalesTax() {
  let state = document.getElementById("stateTax").value;
  const finalTax = roundMoney(calculateSubtotal() * SALES_TAX[state]);
  return finalTax;
}

document.getElementById("btnSubtotal").addEventListener("click", () => {
  alert("Your subtotal is: $" + calculateSubtotal());
});

document.getElementById("btnSalesTax").addEventListener("click", () => {
  alert("Your sales tax is: $" + calculateSalesTax());
});

// add an event listener for the checkout button!
document.getElementById("btnCheckout").addEventListener("click", () => {
  alert("Your total is: $" + (calculateSalesTax() + calculateSubtotal()));
});
