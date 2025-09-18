"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  pi_username: string;
  full_name: string;
  email: string;
  role: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "buyer";
    const userId = role === "buyer" ? 2 : 1; // Bob Buyer or Anna Seller

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {loading ? (
        <p>Loading profile...</p>
      ) : !user ? (
        <p>Profile not found.</p>
      ) : (
        <div className="max-w-md bg-white p-6 rounded-xl shadow-md">
          <p className="mb-3">
            <span className="font-semibold">Name:</span> {user.full_name}
          </p>
          <p className="mb-3">
            <span className="font-semibold">Pi Username:</span> {user.pi_username}
          </p>
          <p className="mb-3">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span>{" "}
            <span
              className={`px-2 py-1 rounded text-sm ${
                user.role === "buyer"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              {user.role}
            </span>
          </p>
        </div>
      )}
    </main>
  );
}
