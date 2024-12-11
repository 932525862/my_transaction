import { useState } from "react";
import { toast } from "react-toastify";
import AnalyticsServis from "../servise/service";
const useProductAnalytics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AnalyticsServis.get("/products"); // API chaqiruv
      setProducts(response.data); // Olingan ma'lumotni state'ga saqlash
      return response.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Mahsulotlarni olishda xatolik yuz berdi.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  
  const calculateProductResources = async (productId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AnalyticsServis.post("/calculate-resources", {
        productId,
        quantity,
      });
      return response.data;
    } catch (err) {
      console.error("Error calculating resources:", err);
      setError("Resurslarni hisoblashda xatolik yuz berdi.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, getProducts, calculateProductResources };
};

export default useProductAnalytics;
