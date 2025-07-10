'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LinkVSCodePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    const handleLinkVSCode = async () => {
        setMessage('');
        // In a real application, you would provide instructions or initiate a process
        // to link VS Code (e.g., via an extension or API key).
        // For now, we'll simulate a successful linking.
        try {
            // Simulate API call or process
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage('VS Code linked successfully! Instructions for use will be provided.');
        } catch (error) {
            setMessage('Failed to link VS Code. Please try again.');
            console.error('Error linking VS Code:', error);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <p>Loading...</p>
            </div>
        );
    }

    if (session) {
        return (
            <div className="min-h-screen bg-background text-foreground p-8">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-primary-foreground">Link VS Code</h1>
                    <div className="glass rounded-lg shadow-lg p-6 text-center">
                        <p className="text-muted-foreground mb-6">Follow the instructions to link your VS Code environment with your account.</p>
                        <button
                            onClick={handleLinkVSCode}
                            className="px-6 py-3 btn-primary rounded-lg shadow-md transition duration-300 focus-ring"
                        >
                            Link VS Code
                        </button>
                        {message && (
                            <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null;
}