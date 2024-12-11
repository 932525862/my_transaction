import React, { useState } from "react";
import ModalComponent from "../../components/Modal"; 
import useProductAnalytics from "./servise/service";

const ProductAnalytics = () => {
  const [typeId, setTypeId] = useState("");
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error, fetchProductAnalytics } = useProductAnalytics();

  const handleFetch = () => {
    if (typeId && count > 0) {
      fetchProductAnalytics(typeId, count);
      setIsModalOpen(true); // Modalni ochish
    } else {
      alert("Mahsulot turi va miqdorini to'g'ri kiriting!");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Modalni yopish
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Mahsulot Analitikasi</h1>

      <div className="mb-4">
        <label htmlFor="typeId" className="block font-semibold mb-2">
          Mahsulot turi ID:
        </label>
        <input
          type="text"
          id="typeId"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="count" className="block font-semibold mb-2">
          Miqdor:
        </label>
        <input
          type="number"
          id="count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      <button
        onClick={handleFetch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Hisoblash
      </button>

      <ModalComponent
        title="Mahsulot Analitikasi"
        isOpen={isModalOpen}
        onCancel={closeModal}
        width={800} // Modal kengligini sozlash
      >
        <div>
          {isLoading && <p className="text-blue-500">Yuklanmoqda...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {data ? (
            <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="border border-gray-300 px-4 py-2">Resurs Nomi</th>
                  <th className="border border-gray-300 px-4 py-2">Sariflangan Miqdor</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data).map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{key}</td>
                    <td className="border border-gray-300 px-4 py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Ma'lumot yo'q</p>
          )}
        </div>
      </ModalComponent>
    </div>
  );
};

export default ProductAnalytics;
