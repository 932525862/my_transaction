import { useEffect} from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../../../../../components/InputField";
import SingleDatePickerField from "../../../../../components/SingleDatePicker";
import { useParams } from "react-router-dom";
import api from "../../../../../../axios";

const EditSingleCategory = ({ onModalClose, editSingleCategoryData, refetch }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const {id} = useParams()
  useEffect(() => {
    if (editSingleCategoryData) {
      reset({
        price: editSingleCategoryData?.price,
        createdAt: editSingleCategoryData?.createdAt,
        quantity: editSingleCategoryData?.quantity,
      });
    }
  }, [editSingleCategoryData]);
  

  const onSubmit = async (data) => {

    const newData = {
      price: +data?.price,
      quantity: +data?.quantity,
      createdAt: data?.createdAt,
      categoryId: id
    }
    try {
      // API'ga ma'lumotlarni yuborish
      const response = await api.patch(`/api/stock-history/${editSingleCategoryData?.id}`, newData);
      
      if (response?.statusText == "OK" || response?.status == 200 || response?.status == 201) {
        toast.success("Mahsulot muvaffaqiyatli o'zgartirildi!");
        onModalClose();
        reset();
        refetch()
      }
    } catch (error) {
      toast.error("Mahsulot o'zgartirishda xatolik yuz berdi!");
    }
  };

  return (
    <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
      {/* Kategoriya nomi maydoni */}
      <InputField
        control={control}
        name="price"
        label="Mahsulot Narxi"
        placeholder="Masalan, 20000"
        type="number"
        rules={{
          required: "Mahsulot narxini kiriting"
        }}
        error={errors?.category} // Xatolikni ko'rsatish
      />

      {/* Miqdor turi maydoni */}
      <div className="mb-4">
     
      <InputField
        control={control}
        name="quantity"
        label="Mahsulot soni"
        placeholder="mahsulot soni"
        type="number"
        rules={{
          required: "Mahsulot sonini kiriting",
        }}
        error={errors?.category} // Xatolikni ko'rsatish
      />
      </div>
      <SingleDatePickerField
        control={control}
        name="createdAt"
        label="Mahsulot keltirilgan sana"
        placeholder="Sanani tanlang"
        rules={{ required: "Sanani kiriting" }}
        error={errors.date}
      />
      <Button
        type="primary"
        htmlType="submit"
        className="w-full"
      >
        O'zgartirish
      </Button>
    </form>
  );
};

export default EditSingleCategory;