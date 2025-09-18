"use client";
import { useEffect, useState } from "react";

// 🔹 Simple Navbar component
function Navbar() {
  return (
    <nav className="bg-purple-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Pi Marketplace</h1>
      <div className="space-x-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="#" className="hover:underline">
          My Orders
        </a>
        <a href="#" className="hover:underline">
          Profile
        </a>
      </div>
    </nav>
  );
}

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
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

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
            buyerId: 2, // demo buyer (Bob Buyer from seed data)
            listingId: listingId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(`✅ Order placed for "${data.order.title || "listing"}"!`);
      } else {
        setStatusMessage(`❌ Failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("❌ Network error while placing order");
    }

    // Clear message after 3s
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">Browse Listings</h1>

        {statusMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded shadow">
            {statusMessage}
          </div>
        )}

        {loading ? (
          <p>Loading listings...</p>
        ) : listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-xl shadow-md hover:shadow-lg bg-white flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <span className="inline-block mt-2 text-sm text-purple-700 bg-purple-100 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-bold text-lg">
                    {item.price} {item.currency}
                  </p>
                  <button
                    onClick={() => handleBuy(item.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Buy Now
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">📍 {item.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600">
        Built for Pi Hackathon 2025 🚀
      </footer>
    </main>
  );
}
