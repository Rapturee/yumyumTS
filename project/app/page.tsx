"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { useEffect, useState } from "react";
import { fetchProductsByType } from "./redux/foodtruckSlice";
import CategoriesContainer from "./components/Wontons";
import CartModal from "./components/CartModal";
import AdditionsContainer from "./components/Additions";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const wontons = useSelector((state: RootState) => state.products.wontons);
  const dips = useSelector((state: RootState) => state.products.dips);
  const drinks = useSelector((state: RootState) => state.products.drinks);
  const order = useSelector((state: RootState) => state.products.order);
  const productStatus = useSelector(
    (state: RootState) => state.products.status
  );
  const [isCartOpen, setisCartOpen] = useState<Boolean>(false);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProductsByType("wonton"));
      dispatch(fetchProductsByType("dip"));
      dispatch(fetchProductsByType("drink"));
    }
  }, [productStatus, dispatch]);

  const handleToggleCart = (): void => {
    setisCartOpen(!isCartOpen);
  };

  const numberOfProducts = order.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="bg-[#489078]">
      <div className="relative">
        <button
          onClick={handleToggleCart}
          className="border flex items-center m-4 justify-center float-end rounded-lg border-none shadow-xl h-14 w-14 bg-[##F4F3F1F0]"
        >
          <img src="/cart.svg"></img>
        </button>
        <p className="bg-[#EB5757] mt-2 mr-2 rounded-full text-[#F4F3F1F0] transform translate-x-1/2 -translate-y-1/2 p-2 flex items-center justify-center w-3 h-3 absolute top-0 right-0">
          {numberOfProducts}
        </p>
      </div>

      <div className="flex justify-between py-3 px-5">
        <h2 className="text-[#F4F3F1F0] text-[32px] drop-shadow-3xl pt-16 mb-0">
          MENY
        </h2>
      </div>
      <CategoriesContainer title="" products={wontons} />
      <AdditionsContainer title="DIPSÅS" products={dips} />
      <AdditionsContainer title="DRICKA" products={drinks} />
      {isCartOpen && <CartModal onClose={handleToggleCart} />}
    </div>
  );
}
