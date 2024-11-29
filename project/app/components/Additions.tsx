import type { AdditionsContainerProps, Additions } from "../types";
import { addToOrder } from "../redux/foodtruckSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function AdditionsContainer({
  title,
  products,
}: AdditionsContainerProps) {
  const dispatch = useDispatch();
  const [clickedProductId, setClickedProductId] = useState<number | null>(null);

  const handleAddToOrder = (item: Additions) => {
    setClickedProductId(item.id);
    dispatch(addToOrder(item));

    // timeout för färgen
    setTimeout(() => {
      setClickedProductId(null);
    }, 200);
  };

  return (
    <section className="pb-4">
      <div className="justify-center mx-4 px-4 bg-[#605858] flex-wrap items-center border rounded-xl p-2 shadow-xl">
        <div className="flex justify-between w-full items-baseline">
          <h4 className="text-white text-lg m-0">{title}</h4>
          <p className="dots flex-1 mx-2 border-0 border-gray-600"></p>
          <p className="text-white text-xl font-bold m-0">
            {products.length > 0 ? products[0].price : null} SEK
          </p>
        </div>
        <div className="flex flex-wrap justify-start">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-center">
              <button
                className={`hover:cursor-pointer rounded-md m-2 p-0 border-b-0 border-t-0 border-r-0 border-l-0 border-dotted border-[#7f7474] text-[#F4F3F1F0] ${
                  clickedProductId === product.id
                    ? "bg-[#353131]"
                    : "bg-[#837C7C]"
                }`}
                onClick={() => handleAddToOrder(product)}
              >
                <ul className="list-none m-0 p-1">
                  <p className="font-bold text-[14px] m-2">{product.name}</p>
                </ul>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
