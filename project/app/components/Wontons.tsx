import type { CategoriesContainerProps, Wonton, Dip, Drink } from "../types";
import { addToOrder } from "../redux/foodtruckSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Fira_Sans } from "next/font/google";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function WontonsContainer({
  products,
}: CategoriesContainerProps) {
  const dispatch = useDispatch();
  const [clickedProductId, setClickedProductId] = useState<number | null>(null);

  const handleAddToOrder = (item: Wonton | Dip | Drink) => {
    setClickedProductId(item.id);
    dispatch(addToOrder(item));

    // timeout för färgen
    setTimeout(() => {
      setClickedProductId(null);
    }, 150);
  };



  return (
    <section className="bg-[#489078]">
      <div className="flex flex-col mt-0 justify-center overflow-hidden shadow-xl mx-4 bg-[#605858] items-center border rounded-xl my-4">
        {products.map((product) => (
          <button
            key={product.id}
            className={` hover:cursor-pointer w-full border-b-0 border-r-0 border-l-0 border-dotted border-[#7f7474] text-[#F4F3F1F0] ${
              clickedProductId === product.id ? "bg-[#353131]" : " bg-[#605858]"
            }`}
            onClick={() => handleAddToOrder(product)}
          >
            <li className="list-none">
              <div className="flex justify-between items-baseline">
                <h4 className={`${firaSans.className} text-xl m-2`}>{product.name.toUpperCase()}</h4>
                <p className={`${firaSans.className} font-bold text-xl m-2`}>{product.price} SEK</p>
              </div>
              <p className={`${firaSans.className} text-left pl-2 mt-0`}>
                {product.description.toLowerCase()}
              </p>
            </li>
          </button>
        ))}
      </div>
    </section>
  );
}
