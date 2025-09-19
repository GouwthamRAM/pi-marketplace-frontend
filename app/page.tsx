"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

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
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // 🚀 Redirect unauthenticated users to /login
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/listings`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  }, []);

  if (authLoading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!user) {
    return null; // redirect already triggered
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">Browse Listings</h1>

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
                  <h2 className="text-xl font-semibold">
                    <Link href={`/listing/${item.id}`} className="hover:underline">
                      {item.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <span className="inline-block mt-2 text-sm text-purple-700 bg-purple-100 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-bold text-lg">
                    {item.price} {item.currency}
                  </p>
                  {user.id === 2 ? (
                    <Link
                      href={`/listing/${item.id}`}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                    >
                      View & Buy
                    </Link>
                  ) : (
                    <span className="text-xs text-gray-500 italic">👀 Seller View</span>
                  )}
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
