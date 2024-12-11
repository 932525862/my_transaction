import { useState, useEffect } from "react";
import AnalyticsServis from "../servise/service"; 

const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true); 
      setError(null); 

      try {
        const data = await AnalyticsServis.getAnalytics(); 
        setAnalyticsData(data); 
      } catch (err) {
        setError(err.message || "Ma'lumotlarni olishda xatolik yuz berdi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { analyticsData, isLoading, error }; 
};

export default useAnalytics;
