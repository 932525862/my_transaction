import api from "../../../../axios";

const AnalyticsServis = {
  getAll: async (startDate, endDate, setData) => {
    try {
      const response = await api.get("/api/analytics/monthly", {
        params: {
          from: startDate,
          to: endDate,
        },
      });

      console.log("API response:", response);

      if (response?.data) {
        setData(response?.data);

        if (response.data.data) {
          return response.data.data;
        } else {
          console.error("No 'data' property in the response data.");
          throw new Error("No 'data' property in the response data.");
        }
      } else {
        console.error("No 'data' property in the response.");
        throw new Error("No 'data' property in the response.");
      }
    } catch (err) {
      console.error("Error fetching monthly analytics:", err);

      if (err.response) {
        if (err.response.status === 500) {
          return {
            error: "Ma'lumotni yuklashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
          };
        } else {
          return {
            error: `Xatolik: ${err.response.status} - ${err.response.data?.message || "Boshqa xatolik"}`,
          };
        }
      } else if (err.request) {
        return {
          error: `So'rov yuborildi, lekin javob olinmadi. Iltimos, qaytadan urinib ko'ring: ${err.message}.`,
        };
      } else {
        console.error("Error creating the request:", err.message);
        throw err;
      }
    }
  },

  getProductAnalytics: async (typeId, count) => {
    try {
      const response = await api.get(`/api/analytics/type?typeId=${typeId}&count=${count}`);
      console.log("Product Analytics API response:", response);

      if (response?.data) {
        return response.data;
      } else {
        throw new Error("No data received from product analytics.");
      }
    } catch (err) {
      console.error("Error fetching product analytics data:", err);
      throw err;
    }
  },
};

export default AnalyticsServis;
