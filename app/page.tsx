"use client";
import { useEffect, useState } from "react";

type Listing = {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  location: string;
};

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch listings on page load
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/listings`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Handle Buy Now click (calls mock orders API)
  const handleBuy = async (listingId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/mock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            buyerId: 2, // hardcoded demo buyer (Bob Buyer from seed data)
            listingId: listingId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Order placed!\n\n${data.message}`);
      } else {
        alert(`❌ Failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Network error while placing order");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Pi Marketplace</h1>

      {loading ? (
        <p>Loading listings...</p>
      ) : listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg shadow hover:shadow-lg bg-white"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="mt-2 font-bold">
                {item.price} {item.currency}
              </p>
              <p className="text-sm text-gray-500">{item.location}</p>

              {/* Buy Now Button */}
              <button
                onClick={() => handleBuy(item.id)}
                className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
