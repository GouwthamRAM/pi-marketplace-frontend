"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  id: number;
  amount: number;
  status: string;
  createdAt: string;
  Listing: {
    title: string;
    price: number;
    currency: string;
    seller: {
      pi_username: string;
      full_name: string;
    };
  };
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const router = useRouter();

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") || "buyer";
    setRole(savedRole as "buyer" | "seller");

    if (savedRole === "buyer") {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders?buyerId=2`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
          setLoading(false);
        });
    } else {
      // ✅ Redirect sellers to /sales
      router.push("/sales");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {role === "seller" ? (
        <p>Redirecting to My Sales...</p>
      ) : loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Listing</th>
                <th className="px-4 py-2 border">Seller</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.Listing?.title}</td>
                  <td className="px-4 py-2 border">
                    {order.Listing?.seller?.full_name} (
                    {order.Listing?.seller?.pi_username})
                  </td>
                  <td className="px-4 py-2 border">
                    {order.amount} {order.Listing?.currency}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(order.createdAt).toLocaleString()}
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
