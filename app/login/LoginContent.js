
'use client';

import LoginForm from '@/app/components/LoginForm';
import { useSearchParams } from 'next/navigation';

export default function LoginContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <LoginForm error={error} />
            </div>
        </div>
    );
}
