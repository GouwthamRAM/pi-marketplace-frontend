"use client";

import { useEffect, useState } from "react";

type Sale = {
  id: number;
  amount: number;
  status: string;
  createdAt: string;
  Listing: {
    title: string;
    price: number;
    currency: string;
    buyerId: number;
  };
};

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") || "buyer";
    setRole(savedRole as "buyer" | "seller");

    if (savedRole === "seller") {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders?sellerId=1`)
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
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">My Sales</h1>

      {role !== "seller" ? (
        <p>You must be logged in as a Seller to view sales.</p>
      ) : loading ? (
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
                <th className="px-4 py-2 border">Buyer ID</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{sale.id}</td>
                  <td className="px-4 py-2 border">{sale.Listing?.title}</td>
                  <td className="px-4 py-2 border">{sale.Listing?.buyerId}</td>
                  <td className="px-4 py-2 border">
                    {sale.amount} {sale.Listing?.currency}
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

