'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [piUsername, setPiUsername] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [status, setStatus] = useState<string | null>(null);
  const { user, login, logout } = useAuth();
  const router = useRouter();

  // Mock users for midpoint demo
  const USERS = {
    buyer: { id: 2, pi_username: 'bob_buyer', full_name: 'Bob Buyer' },
    seller: { id: 1, pi_username: 'anna_seller', full_name: 'Anna Seller' }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { ...USERS[role] };

    // If Pi username is typed, override mock username
    if (piUsername.trim()) {
      userData.pi_username = piUsername.trim();
    }

    login(userData);
    setStatus(`✅ Logged in as ${userData.full_name}`);

    // Redirect after short delay
    setTimeout(() => {
      router.push('/');
    }, 800);
  };

  const handleLogout = () => {
    logout();
    setStatus('⚠️ You have been logged out');
    // Optionally redirect back to login cleanly
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">
          Mock Pi Login
        </h1>

        {user ? (
          <div className="space-y-4 text-center">
            <p className="text-gray-700">
              You are currently logged in as:
              <br />
              <span className="font-semibold">
                {user.full_name} ({user.pi_username})
              </span>
            </p>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Log out
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Pi Username (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. bob_buyer"
                value={piUsername}
                onChange={(e) => setPiUsername(e.target.value)}
                className="border w-full px-2 py-1 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'buyer' | 'seller')}
                className="border w-full px-2 py-1 rounded"
              >
                <option value="buyer">Buyer (Bob)</option>
                <option value="seller">Seller (Anna)</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Log in as {role === 'buyer' ? 'Bob Buyer' : 'Anna Seller'}
            </button>
          </form>
        )}

        {status && (
          <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
        )}
      </div>
    </div>
  );
}
