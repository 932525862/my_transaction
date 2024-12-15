

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getExchangeRates = async (baseCurrency) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    const data = await response.json();
    return data.conversion_rates;  
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    const rates = await getExchangeRates(fromCurrency);
    if (!rates || !rates[toCurrency]) {
      throw new Error('Invalid conversion rate or currency');
    }
    const rate = rates[toCurrency];
    return amount * rate;
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
};
