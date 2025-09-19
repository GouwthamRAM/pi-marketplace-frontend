"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function BuyButton({ listingId }: { listingId: number }) {
  const { user } = useAuth();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 🧹 Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showMessage = (msg: string) => {
    setStatusMessage(msg);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleBuy = async () => {
    if (!user) {
      showMessage("⚠️ Please log in before placing an order.");
      return;
    }

    if (user.id === 1) {
      showMessage("⚠️ Sellers cannot buy their own products.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/mock`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            buyerId: user.id,
            listingId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showMessage(`✅ Order placed successfully for listing #${listingId}`);
      } else {
        showMessage(`❌ Failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error(error);
      showMessage("❌ Network error while placing order");
    }
  };

  // 👉 UI logic
  if (!user) {
    return <p className="text-sm text-gray-500">⚠️ Please log in to buy.</p>;
  }

  if (user.id === 1) {
    return (
      <p className="text-sm text-gray-500">
        👀 Logged in as Seller — buying disabled.
      </p>
    );
  }

  return (
    <div>
      <button
        onClick={handleBuy}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Buy Now
      </button>

      {statusMessage && (
        <div className="mt-3 p-2 rounded shadow text-sm
          ${
            statusMessage.startsWith("✅")
              ? "bg-green-100 text-green-800"
              : statusMessage.startsWith("⚠️")
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }"
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
}
