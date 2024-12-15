import { useState, useEffect } from 'react';
import { getExchangeRates } from '../services/exchangeRateService';

export const useExchangeRates = (baseCurrency) => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const fetchedRates = await getExchangeRates(baseCurrency);
        setRates(fetchedRates);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch exchange rates');
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  return { rates, loading, error };
};
