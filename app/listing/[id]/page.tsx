import { notFound } from "next/navigation";
import BuyButton from "./BuyButton"; // ✅ client component

type Listing = {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  location: string;
};

// 🔹 Server-side fetch
async function getListing(id: string): Promise<Listing | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/listings/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// 🔹 Server Component
// ❌ Don't over-type params (Vercel build issue)
// ✅ Use `any` to bypass constraint errors
export default async function ListingPage({ params }: any) {
  const listing = await getListing(params.id);

  if (!listing) return notFound();

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

        {/* ✅ Client Buy Button */}
        <div className="mt-6">
          <BuyButton listingId={listing.id} />
        </div>
      </div>
    </main>
  );
}
