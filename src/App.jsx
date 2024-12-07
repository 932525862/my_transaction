import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/Layout";
import Analytics from "./pages/analiytics/Analytics";
import Employees from "./pages/employment/Employees";
import Category from "./pages/products/Category";
import Shops from "./pages/shop/Shops";
import Login from "./pages/auth/Login";
import Error404 from "./pages/error404/Error404";
import SingleShop from "./pages/shop/components/SingleShop";
import ReadyProduct from "./pages/readyProduct/ReadyProduct";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useStore } from "./store/store";
import api from "../axios";
import { useEffect } from "react";
import SingleCategory from "./pages/products/components/singleCategory/SingleCategory";
import Attendance from "./pages/employment/Components/Attendance";
import History from "./pages/products/components/history/History";
import HistoryReadyProduct from "./pages/readyProduct/components/history/History";
import SingleReadyProduct from "./pages/readyProduct/components/singleReadyProduct/SingleReadyProduct";

function App() {
  const {accessToken, clearUser} = useStore()
  const navigate = useNavigate();

  const token = async (token) => {
    try {
      const response = await api.get(`/api/auth/token?accessToken=${token}`);
      if (!response?.data?.is_valid) {
        navigate("/login");
        clearUser();
      } 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      token(accessToken);
    } else {
      navigate("/login");
    }
  }, [accessToken]);
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Analytics />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/categories/:id" element={<SingleCategory />} />
          <Route path="/categories/history/:id" element={<History />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shops/:id" element={<SingleShop />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/attendance" element={<Attendance />} />
          <Route path="/ready-product" element={<ReadyProduct />} />
          <Route path="/ready-product/:id" element={<SingleReadyProduct/>} />
          <Route path="/ready-product/history/:id" element={<HistoryReadyProduct />} />
          <Route path="/*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
