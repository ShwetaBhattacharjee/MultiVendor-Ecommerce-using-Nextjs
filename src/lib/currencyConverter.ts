export async function fetchExchangeRates(baseCurrency: string = "USD") {
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/e320433248abf8021d1d13c9/latest/${baseCurrency}`
      );
      const data = await res.json();
      if (data.result === "success") {
        return data.conversion_rates; // Returns an object with currency rates
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      return null;
    }
  }
  
  // Convert price
  export function convertCurrency(
    amount: number,
    fromRate: number,
    toRate: number
  ) {
    return (amount / fromRate) * toRate;
  }
  