
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginForm({ error }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleDefaultLogin = async (e) => {
        e.preventDefault();
        await signIn('credentials', { email, password, callbackUrl: '/' });
    };

    const handleGoogleLogin = async () => {
        await signIn('google', { callbackUrl: '/' });
    };

    return (
        <form onSubmit={handleDefaultLogin} className="space-y-6">
            {error === 'OAuthAccountNotLinked' && (
                <div className="bg-red-500 text-white p-3 rounded-lg text-center">
                    An account with this email already exists. Please sign in with your existing account or link your Google account after signing in.
                </div>
            )}
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
                Login
            </button>
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus-ring"
            >
                Login with Google
            </button>
        </form>
    );
}
