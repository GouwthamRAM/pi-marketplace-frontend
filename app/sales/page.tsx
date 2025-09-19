"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

type Sale = {
  id: number;
  amount: number;
  status: string;
  createdAt: string;
  listing: {
    title: string;
    price: number;
    currency: string;
  };
  buyer?: {
    pi_username: string;
    full_name: string;
  };
};

export default function SalesPage() {
  const { user, loading: authLoading } = useAuth();
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login"); // ✅ redirect if logged out
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user || authLoading) return;

    if (user.id === 1) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/seller/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setSales(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching sales:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || !user) {
    return <p className="p-6">Loading...</p>;
  }

  if (user.id !== 1) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-6">My Sales</h1>
        <p>⚠️ You must be logged in as a Seller to view sales.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">My Sales</h1>

      {loading ? (
        <p>Loading sales...</p>
      ) : sales.length === 0 ? (
        <p>No sales yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Listing</th>
                <th className="px-4 py-2 border">Buyer</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{sale.id}</td>
                  <td className="px-4 py-2 border">{sale.listing?.title}</td>
                  <td className="px-4 py-2 border">
                    {sale.buyer
                      ? `${sale.buyer.full_name} (${sale.buyer.pi_username})`
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2 border">
                    {sale.amount} {sale.listing?.currency}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        sale.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(sale.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
