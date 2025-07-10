'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChangePasswordPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (newPassword !== confirmNewPassword) {
            setMessage('New passwords do not match.');
            return;
        }

        try {
            const res = await fetch('/api/profile/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Password updated successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                setMessage(data.message || 'Failed to update password.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Error changing password:', error);
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
                    <h1 className="text-3xl font-bold mb-6 text-primary-foreground">Change Password</h1>
                    <div className="glass rounded-lg shadow-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-muted-foreground">Current Password</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus-ring"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-muted-foreground">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus-ring"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmNewPassword" className="block mb-2 text-sm font-medium text-muted-foreground">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirmNewPassword"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus-ring"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 btn-primary rounded-lg shadow-md transition duration-300 focus-ring"
                            >
                                Change Password
                            </button>
                            {message && (
                                <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}