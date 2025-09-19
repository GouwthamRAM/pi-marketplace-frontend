"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Coins } from "lucide-react"; // ✅ Pi-like coin icon
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  // ✅ Active link = bold + underline
  const linkClass = (path: string) =>
    `hover:underline pb-1 ${
      pathname === path ? "font-bold border-b-2 border-white" : ""
    }`;

  const handleLogout = () => {
    logout();
    router.push("/login"); // ✅ redirect to login after logout
  };

  return (
    <nav className="bg-purple-600 text-white px-6 py-3 flex justify-between items-center shadow border-b-4 border-purple-800">
      {/* ✅ Logo + Title */}
      <div className="flex items-center space-x-2">
        <Coins className="w-6 h-6 text-yellow-300" />
        <h1 className="text-xl font-bold">Pi Marketplace</h1>
      </div>

      <div className="flex items-center space-x-6">
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>

        {user ? (
          <>
            {user.id === 2 ? ( // Bob = Buyer
              <Link href="/orders" className={linkClass("/orders")}>
                My Orders
              </Link>
            ) : (
              <Link href="/sales" className={linkClass("/sales")}>
                My Sales
              </Link>
            )}

            <span className="text-sm italic">
              Logged in as {user.full_name}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className={linkClass("/login")}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
