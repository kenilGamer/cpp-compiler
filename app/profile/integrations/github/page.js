'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ConnectGithubPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    const handleConnectGithub = async () => {
        setMessage('');
        // In a real application, you would initiate the OAuth flow for GitHub here
        // For now, we'll simulate a connection
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage('Successfully connected to GitHub!');
        } catch (error) {
            setMessage('Failed to connect to GitHub. Please try again.');
            console.error('Error connecting to GitHub:', error);
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
                    <h1 className="text-3xl font-bold mb-6 text-primary-foreground">Connect GitHub</h1>
                    <div className="glass rounded-lg shadow-lg p-6 text-center">
                        <p className="text-muted-foreground mb-6">Link your GitHub account to easily import and export code snippets.</p>
                        <button
                            onClick={handleConnectGithub}
                            className="px-6 py-3 btn-primary rounded-lg shadow-md transition duration-300 focus-ring"
                        >
                            Connect with GitHub
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