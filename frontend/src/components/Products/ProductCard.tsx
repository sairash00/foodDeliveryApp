import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { LuMinus } from "react-icons/lu";
import toast from "react-hot-toast";

interface Props {
  id: string;
  name: string;
  price: number;
  images: [string];
}

interface Response {
  success: boolean;
  message: string;
}

const ProductCard: React.FC<Props> = ({ id, name, price, images }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async (): Promise<void> => {
    setDisable(true);
    setLoading(true);
    try {
      const response: AxiosResponse<Response> = await axios.post(
        import.meta.env.VITE_ADD_TO_CART,
        { id, quantity }
      );
      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to add to cart");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMsg);
      } else {
        const genericError = "An unexpected error occurred";
        toast.error(genericError);
      }
    } finally {
      setDisable(false);
      setLoading(false);
      setQuantity(1);
    }
  };

  return (
    <div className="px-2 max-xs:w-full max-sm:justify-between max-xsm:w-full hover:shadow-lg shadow-[#8080804b] hover:bg-[white] transition-all py-2 flex flex-col gap-4 min-w-[16vw] h-fit border border-[#fc4e0330] shadow-md rounded-md overflow-hidden">
      <img
        src={images?.[0]}
        loading="lazy"
        alt={name}
        className="shadow-md shadow-[#8080804b] object-cover object-center w-full max-xs:h-[50vh] h-[30vh] rounded-lg"
      />
      <div className="flex justify-between items-center mt-2">
        <div>
          <h2 className="text-sm font-semibold">{name}</h2>
          <p className="font-bold">Rs. {price}</p>
        </div>
        <div className="flex items-center gap-2">
          <LuMinus
            onClick={handleDecrement}
            className="text-2xl text-[#fc4e03] hover:text-[gray] hover:scale-[1.1] font-semibold transition cursor-pointer"
          />
          <p className="font-semibold">{quantity}</p>
          <IoAddOutline
            onClick={handleIncrement}
            className="text-2xl text-[#fc4e03] hover:text-[gray] hover:scale-[1.1] font-semibold transition cursor-pointer"
          />
        </div>
      </div>
      <button
        onClick={addToCart}
        className= {disable ? "bg-[#FC4E03] cursor-not-allowed hover:bg-[#d44001] font-semibold transition text-[#fff] px-4 py-2 rounded-md" : "bg-[#FC4E03] hover:bg-[#d44001] font-semibold transition text-[#fff] px-4 py-2 rounded-md"}
        disabled = {disable}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
