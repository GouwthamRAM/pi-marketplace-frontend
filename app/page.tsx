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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/listings`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Pi Marketplace</h1>
      {listings.length === 0 ? (
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
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
