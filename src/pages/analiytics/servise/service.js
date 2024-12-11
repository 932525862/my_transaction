import api from "../../../../axios";
import { toast } from "react-toastify";

const AnalyticsServis = {
  getAll: async (setData) => {
    try {
    
      const response = await api.get("/api/analytics");

      
      const result = response?.data || null;

      if (!result) {
        throw new Error("No valid data found in the response.");
      }

      setData(result);
      return result;
    } catch (err) {
      console.error("Error in API call:", err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
      throw err;
    }
  },
};

export default AnalyticsServis;
