"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store"; // Kontrollera sökvägen till store
import { useRouter } from "next/navigation";

export default function YouReceipt() {
  const router = useRouter();

  // Hämta orderdetaljer från Redux store
  const items = useSelector((state: RootState) => state.products.order);
  const orderId = useSelector((state: RootState) => state.products.orderId);

  // Räkna ut totalen
  const totalSum = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="bg-[#605858] h-screen flex items-center justify-center flex-col">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <div className="flex flex-col justify-center items-center mb-4">
          <img src="/logo.png" alt="Logo" className="w-20 h-auto mb-2" />
          <h2 className="text-xl font-bold text-gray-800">KVITTO</h2>
          <p className="text-gray-600 text-sm">#{orderId}</p>
        </div>

        {/* Lista alla varor */}
        <div className="mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-gray-300 py-2"
            >
              <div>
                <p className="font-semibold text-gray-700">{item.name}</p>
                <p className="text-sm text-gray-500">{item.quantity} stycken</p>
              </div>
              <p className="font-semibold text-gray-800">
                {item.price * item.quantity} SEK
              </p>
            </div>
          ))}
        </div>

        {/* Total summa */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between">
            <p className="font-bold text-gray-700">TOTALT</p>
            <p className="font-bold text-gray-900">{totalSum} SEK</p>
          </div>
          <p className="text-sm text-gray-500">inkl 20% moms</p>
        </div>
      </div>

      {/* Knapp för ny beställning */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-[#363131] text-white py-2 px-4 rounded-lg hover:bg-[#1a1a1a]"
      >
        GÖR EN NY BESTÄLLNING
      </button>
    </main>
  );
}
