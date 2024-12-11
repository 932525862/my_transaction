import { useState } from "react";
import { toast } from "react-toastify";
import AnalyticsServis from "../servise/service";

export const Oylikhooks = () => {
  const [isLoading, setIsLoading] = useState(false);
   
  const getHisobot = async (startDate, endDate, setData) => { // Sanalarni parametr sifatida olish
    setIsLoading(true);
    try {
      const response = await AnalyticsServis.getAll(startDate, endDate, setData); // Sanalarni API'ga yuborish
      return response.data;  
    } catch (err) {
      toast.error(err?.response?.message || "Something went wrong!");
      return null; 
    } finally {
      setIsLoading(false); 
    }
  };

  return {
    getHisobot,
    isLoading,
  };
};
