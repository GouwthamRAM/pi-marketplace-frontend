"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Coins } from "lucide-react"; // ✅ import icon
import LoginToggle from "./LoginToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") || "buyer";
    setRole(savedRole as "buyer" | "seller");
  }, []);

  // ✅ Active link = bold + white underline
  const linkClass = (path: string) =>
    `hover:underline pb-1 ${
      pathname === path ? "font-bold border-b-2 border-white" : ""
    }`;

  return (
    <nav className="bg-purple-600 text-white px-6 py-3 flex justify-between items-center shadow border-b-4 border-purple-800">
      {/* ✅ Logo + Title */}
      <div className="flex items-center space-x-2">
        <Coins className="w-6 h-6 text-yellow-300" /> {/* Pi-like coin icon */}
        <h1 className="text-xl font-bold">Pi Marketplace</h1>
      </div>

      <div className="flex items-center space-x-6">
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>

        {role === "buyer" ? (
          <Link href="/orders" className={linkClass("/orders")}>
            My Orders
          </Link>
        ) : (
          <Link href="/sales" className={linkClass("/sales")}>
            My Sales
          </Link>
        )}

        <LoginToggle />
      </div>
    </nav>
  );
}
