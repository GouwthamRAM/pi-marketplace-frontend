"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ import AuthContext

export default function BuyButton({ listingId }: { listingId: number }) {
  const { user } = useAuth();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleBuy = async () => {
    if (!user) {
      setStatusMessage("⚠️ Please log in before placing an order.");
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/mock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            buyerId: user.id, // ✅ dynamic from login
            listingId: listingId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(
          `✅ Order placed successfully for listing #${listingId}`
        );
      } else {
        setStatusMessage(`❌ Failed: ${data.error || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error(error);
      setStatusMessage("❌ Network error while placing order");
    }

    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div>
      <button
        onClick={handleBuy}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Buy Now
      </button>

      {statusMessage && (
        <div className="mt-3 p-2 bg-green-100 text-green-800 rounded shadow">
          {statusMessage}
        </div>
      )}
    </div>
  );
}
