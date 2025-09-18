"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginToggle() {
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const pathname = usePathname();

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole === "buyer" || savedRole === "seller") {
      setRole(savedRole);
    }
  }, []);

  const switchRole = (newRole: "buyer" | "seller") => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole);
    window.location.reload();
  };

  const profileClass = `underline text-sm pb-1 ${
    pathname === "/profile" ? "font-bold border-b-2 border-white" : ""
  }`;

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm">Logged in as:</span>
      <span
        className={`px-2 py-1 rounded text-sm ${
          role === "buyer"
            ? "bg-blue-100 text-blue-700"
            : "bg-purple-100 text-purple-700"
        }`}
      >
        {role}
      </span>
      <button
        onClick={() => switchRole(role === "buyer" ? "seller" : "buyer")}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
      >
        Switch to {role === "buyer" ? "Seller" : "Buyer"}
      </button>
      <Link href="/profile" className={profileClass}>
        Profile
      </Link>
    </div>
  );
}
