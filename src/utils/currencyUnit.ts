interface CurrencyUnitMap {
  [key: string]: string;
}

const currencyUnits: CurrencyUnitMap = {
  "BRL": "R$",
  "MXN": "MXN",
  "USD": "$",
};

export function getUnitByCurrency(currency: string): string {
  return currencyUnits[currency] || "Currency Unit not found";
}