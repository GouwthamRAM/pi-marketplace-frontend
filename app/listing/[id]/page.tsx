"use client";

import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // ✅ import
import BuyButton from "./BuyButton";

type Listing = {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  location: string;
};

export default function ListingPage({ params }: { params: { id: string } }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  // 🚀 Redirect unauthenticated users
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  // Fetch listing
  useEffect(() => {
    if (!params.id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/listings/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setListing(data);
        setLoading(false);
      })
      .catch(() => {
        setListing(null);
        setLoading(false);
      });
  }, [params.id]);

  if (authLoading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!user) {
    return null; // redirect already triggered
  }

  if (loading) {
    return <p className="p-6">Loading listing...</p>;
  }

  if (!listing) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
        <p className="text-gray-600 mb-4">{listing.description}</p>
        <p className="font-bold text-lg mb-2">
          {listing.price} {listing.currency}
        </p>
        <p className="text-sm text-gray-500 mb-2">📍 {listing.location}</p>
        <span className="inline-block text-sm text-purple-700 bg-purple-100 px-2 py-1 rounded">
          {listing.category}
        </span>

        {/* ✅ Only buyers see Buy button */}
        {user.id === 2 ? (
          <div className="mt-6">
            <BuyButton listingId={listing.id} />
          </div>
        ) : (
          <p className="mt-6 text-gray-500 italic">👀 Seller View</p>
        )}
      </div>
    </main>
  );
}
