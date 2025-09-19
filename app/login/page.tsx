'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [piUsername, setPiUsername] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const { login } = useAuth();
  const router = useRouter();

  // Mock users
  const USERS = {
    buyer: { id: 2, pi_username: 'bob_buyer', full_name: 'Bob Buyer' },
    seller: { id: 1, pi_username: 'anna_seller', full_name: 'Anna Seller' }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, pick the user by role. Optionally check piUsername
    const user = USERS[role];
    login(user);
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Mock Pi Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block">Pi Username (optional)</label>
          <input
            type="text"
            placeholder="e.g. bob_buyer"
            value={piUsername}
            onChange={(e) => setPiUsername(e.target.value)}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label className="block">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'buyer' | 'seller')}
            className="border px-2 py-1"
          >
            <option value="buyer">Buyer (Bob)</option>
            <option value="seller">Seller (Anna)</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">
          Log in as {role === 'buyer' ? 'Bob Buyer' : 'Anna Seller'}
        </button>
      </form>
    </div>
  );
}
