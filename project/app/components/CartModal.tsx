"use client";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  incrementQuantity,
  decrementQuantity,
  SubmitOrder,
} from "../redux/foodtruckSlice";
import { useRouter } from "next/navigation";
import type { CartModalProps } from "../types";
import { useAppDispatch } from "../redux/foodtruckSlice";

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
  const items = useSelector((state: RootState) => state.products.order);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleOrderSubmit = async () => {
    const resultAction = await dispatch(SubmitOrder(items));

    if (SubmitOrder.fulfilled.match(resultAction)) {
      router.push("/submitted-order");
    } else {
      console.error("Order submission failed");
    }
  };

  const totalSum = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="modal-backdrop">
      <div className="modal-content bg-[#EEEEEE] h-full flex flex-col relative">
        <button
          onClick={onClose}
          className="flex justify-end p-2 mt-2 border-none"
        >
          <img src="/cart.svg" />
        </button>

        <ul className="mt-24 list-none p-0 flex-grow overflow-y-scroll">
          {items.map((item, index) => (
            <li
              key={index}
              className="m-2 border-1 pb-2 border-dotted border-[#C2C1C1] border-t-0 border-l-0 border-r-0"
            >
              <div className="flex items-baseline">
                <p className="p-0 m-0 pl-2 font-bold text-xl">{item.name}</p>
                <p className="dots-cart flex-1 p-0 m-0 mx-2 border-0 border-gray-600"></p>
                <p className="p-0 m-0 pr-2 font-bold text-xl">
                  {item.price * item.quantity} SEK{" "}
                  {/* Summan för enskild vara */}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleIncrement(item.id)}
                  className="bg-transparent border-none"
                >
                  <img src="/add.svg" />
                </button>
                <p className="text-xs">{item.quantity} stycken</p>
                <button
                  onClick={() => handleDecrement(item.id)}
                  className="bg-transparent border-none"
                >
                  <img src="/remove.svg" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="w-full h-96 flex flex-col space-y-4 box-border p-4">
          <div className="bg-[#C2C1C1] rounded-md text-[#363131] h-[78px] p-3 box-border flex flex-row justify-between">
            <div className="flex flex-col justify-center">
              <h3 className="m-0">TOTALT</h3>
              <p className="my-1 text-xs">inkl 20% moms</p>
            </div>
            <p className="text-3xl font-bold flex items-center">
              {totalSum} SEK
            </p>
          </div>
          <button
            onClick={handleOrderSubmit}
            className="bg-[#363131] rounded-md h-[78px] text-white text-xl font-bold hover:cursor-pointer"
          >
            TAKE MY MONEY!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
