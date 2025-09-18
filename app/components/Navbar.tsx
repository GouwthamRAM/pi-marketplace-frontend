export default function Navbar() {
  return (
    <nav className="bg-purple-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Pi Marketplace</h1>
      <div className="space-x-4">
        <a href="/" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">My Orders</a>
        <a href="#" className="hover:underline">Profile</a>
      </div>
    </nav>
  );
}
