"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { fetchOrderById } from "@/app/redux/foodtruckSlice";

export default function SubmittedOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const orderId = useSelector((state: RootState) => state.products.orderId);
  const orderDetails = useSelector(
    (state: RootState) => state.products.orderDetails
  );
  const loading = useSelector((state: RootState) => state.products.status);
  const router = useRouter();

  const [etaMinutes, setEtaMinutes] = useState<number | null>(null);

  useEffect(() => {
    if (orderId) {
      console.log("Fetching order by ID:", orderId);
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (orderDetails?.eta) {
      const etaDate = new Date(orderDetails.eta);
      const now = new Date();
      const diffMs = etaDate.getTime() - now.getTime();
      const diffMinutes = Math.ceil(diffMs / (1000 * 60)); // Konvertera millisekunder till minuter
      setEtaMinutes(diffMinutes > 0 ? diffMinutes : 0); // Om diffMinutes är negativ, sätt till 0
    }
  }, [orderDetails]);

  console.log(orderId);
  if (!orderId) {
    return <p>Order id not provided</p>;
  }
  if (loading === "loading") return <p>Loading...</p>;
  if (loading === "failed") return <p>Failed to load order</p>;
  if (!orderDetails) return <p>Order not found</p>;

  return (
    <main className="bg-[#605858] text-white flex h-screen justify-center items-center">
      <div className="text-center w-screen">
        <img src="/boxtop.png" className="content-contain w-[390px]"></img>
        <div className="flex flex-col justify-between">
          <h2 className="mb-2 mt-0">DINA WONTONS TILLAGAS!</h2>
          <h3 className="mb-2">
            ETA {etaMinutes !== null ? `${etaMinutes} min` : "Loading..."}
          </h3>
          <h3 className="text-xs font-thin">#{orderDetails.id}</h3>
        </div>

        <div className="flex flex-col px-3 mt-24">
          <button onClick={() => router.push("your-receipt")} className="bg-transparent rounded-md mb-3 font-bold text-[#CFCDCB] text-2xl h-[78px] border-solid border-[2px] border-[#CFCDCB] hover:cursor-pointer">
            SE KVITTO
          </button>

            <button onClick={() => router.push("/")} className="h-[78px] text-2xl rounded-md font-bold bg-[#363131] text-white border-none hover:cursor-pointer hover:bg-[#0f0d0d]">
              GÖR EN NY BESTÄLLNING
            </button>

        </div>
      </div>
    </main>
  );
}
