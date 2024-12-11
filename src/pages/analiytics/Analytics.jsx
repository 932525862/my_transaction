import React, { useState, useEffect } from "react";
import { FaChartBar, FaDollarSign, FaShoppingCart } from "react-icons/fa";
import ModalComponent from "../../components/Modal";
import CRangePicker from "../../components/RangePicker";
import { Oylikhooks } from "./hooks/Oylikhooks";
import useAnalytics from "./hooks/Analytkahooks";
import useGetData from "../../hooks/useGetData";
import api from "../../../axios";
import { toast } from "react-toastify";

const Analytics = () => {
  const { getHisobot, isLoading } = Oylikhooks();
  const { analyticsData, error } = useAnalytics();
  const [productType, setProductType] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [dates, setDates] = useState([null, null]);
  const [apiData, setApiData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  const [dataResurs, setDataResurs] = useState()
  const {data: conserveType} = useGetData("api/conserve-type")

  const umumiyHisobla = (data) => {
    const boshlangichResurslar = {
      goosht: 0,
      haropka: 0,
      butulka: 0,
      kirichka: 0,
      periprava: 0,
      yog: 0,
      etiketka: 0,
      termoPlonka: 0,
    };

    const umumiy = data.reduce(
      (acc, item) => {
        acc.sotilgan += item.sotilgan;
        acc.tushum += item.tushum;
        acc.ishlabChiqarilgan += item.ishlabChiqarilgan;
        Object.keys(item.resurslar).forEach((key) => {
          acc.resurslar[key] += item.resurslar[key];
        });
        return acc;
      },
      {
        sotilgan: 0,
        tushum: 0,
        ishlabChiqarilgan: 0,
        resurslar: { ...boshlangichResurslar },
      }
    );
    return umumiy;
  };

  

  const getReadyProductResurs = async() => {
    if(productType && productCount){
      try {
        const response = await api.get(`api/analytics/type/{id}?typeId=${productType}&count=${productCount}`);
        setDataResurs(response?.data?.data);
      } catch (err) {
        toast.error("Xatolik yuz berdi")
      }
    }
  }

  console.log(dataResurs);

  const fetchReportData = async () => {
    if (dates[0] && dates[1]) {
      try {
        const response = await getHisobot(dates[0], dates[1], setData);
        if (response && response.length === 0) {
          setErrorMessage("Bu vaqtlar oralig'ida ma'lumotlar topilmadi.");
        } else {
          setApiData(response);
          setErrorMessage("");
        }
      } catch (error) {
        console.error("Error fetching report:", error);
        setErrorMessage(
          "Ma'lumotni yuklashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
        );
      }
    } else {
      setErrorMessage("Sanalarni tanlang!");
    }
  };

  useEffect(() => {
    if (isReportModalOpen) {
      fetchReportData();
    }
  }, [isReportModalOpen, dates]);

  const umumiy = apiData
    ? umumiyHisobla(apiData)
    : { sotilgan: 0, tushum: 0, ishlabChiqarilgan: 0 };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Analitika Bo'limi</h1>
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded text-xl"
        >
          Oylik Hisobot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <FaChartBar className="text-yellow-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold">Ishlab Chiqarilgan</h2>
          <p className="text-2xl font-bold">
            {analyticsData?.totalProduced
              ? `${analyticsData.totalProduced} dona`
              : "Ma'lumot yo'q"}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <FaShoppingCart className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold">Umumiy Sotilgan</h2>
          <p className="text-2xl font-bold">
            {analyticsData?.totalSold
              ? `${analyticsData.totalSold} dona`
              : "Ma'lumot yo'q"}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <FaDollarSign className="text-green-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold">Umumiy Tushum</h2>
          <p className="text-2xl font-bold">
            {analyticsData?.totalProfit
              ? `${analyticsData.totalProfit} so'm`
              : "Ma'lumot yo'q"}
          </p>
        </div>
      </div>

      {/* Resurslar Hisoboti */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Resurslar Hisoboti</h3>

        <div className="mt-4">
          <label htmlFor="productType" className="block text-lg font-medium text-gray-600">
            Mahsulotni tanlang:
          </label>
          <select
            id="productType"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Mahsulotni tanlang</option>
            {conserveType?.map(item => <option key={item?.id} value={item?.id}>{item?.conserveType}</option>)}
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="productCount" className="block text-lg font-medium text-gray-600">
            Miqdorini kiriting:
          </label>
          <input
            id="productCount"
            type="number"
            value={productCount}
            onChange={(e) => setProductCount(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            placeholder="Miqdor"
          />
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => getReadyProductResurs()}
            className="bg-blue-500 text-white px-6 py-3 rounded text-xl"
          >
            Yuborish
          </button>
        </div>

        {dataResurs && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800">Resurslar Hisoboti:</h4>
            <ul className="list-disc pl-6 mt-2">
              {Object.entries(dataResurs).map(([key, value]) => (
                <li key={key} className="text-gray-700">
                  {key}: {value} kg
                </li>
              ))}
            </ul>
          </div>
        )}

        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      </div>

      {/* Modal for Report */}
      <ModalComponent
        title="Oylik Hisobot"
        isOpen={isReportModalOpen}
        onCancel={() => setIsReportModalOpen(false)}
        width="50%"
      >
        <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-4">Sana Tanlash</h3>
        <CRangePicker setDates={setDates} />
        {dates[0] && dates[1] && (
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-bold">Tanlangan Sanalar:</h3>
            <p className="text-lg text-gray-700">
              Boshlanish: {dates[0]} <br />
              Tugash: {dates[1]}
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-6">Loading...</div>
        ) : errorMessage ? (
          <div className="text-center text-red-500 text-xl">{errorMessage}</div>
        ) : (
          <div className="overflow-auto max-h-100 mt-6">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50 text-gray-600 sticky top-0 text-left">
                  <th className="px-12 py-4 border border-gray-300 font-semibold text-lg">
                    Vaqt
                  </th>
                  <th className="px-12 py-4 border border-gray-300 font-semibold text-lg">
                    Ishlab Chiqarilgan
                  </th>
                  <th className="px-12 py-4 border border-gray-300 font-semibold text-lg">
                    Sotildi
                  </th>
                  <th className="px-12 py-4 border border-gray-300 font-semibold text-lg">
                    Tushum
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className={`border-t border-gray-300 ${
                    "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  <td className="px-6 py-4 border border-gray-300">
                    {dates[0]} — {dates[1]}
                  </td>
                  <td className="px-6 py-4 border border-gray-300">
                    {data?.totalSold || 0} dona
                  </td>
                  <td className="px-6 py-4 border border-gray-300">
                    {data?.totalProduced || 0} dona
                  </td>
                  <td className="px-6 py-4 border border-gray-300">
                    {data?.totalProfit || 0} so'm
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </ModalComponent>
    </div>
  );
};

export default Analytics;
