import { useState } from "react";
import { toast } from "react-toastify";
import EmployeeService from "../service/service";

export const useEmployees = () => {
  const [isLoading, setIsLoading] = useState(false);
   
  const getEmployees = async () => {
    
    setIsLoading(true);
    try {
      const response = await EmployeeService.getAll();
      return response; 
    } catch (err) {
      toast.error(err?.response?.data?.message || "");
      return null; 
    } finally {
      setIsLoading(false); 
    }
  };

  return {
    getEmployees,
    isLoading,
  };
};
