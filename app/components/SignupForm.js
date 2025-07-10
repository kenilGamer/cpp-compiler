
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (res.ok) {
                signIn('credentials', { email, password, callbackUrl: '/' });
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus-ring"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus-ring"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus-ring btn-primary"
            >
                Sign Up
            </button>
        </form>
    );
}
