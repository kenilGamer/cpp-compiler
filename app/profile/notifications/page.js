'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NotificationSettingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
        if (session?.user?.settings) {
            setEmailNotifications(session.user.settings.emailNotifications);
            setPushNotifications(session.user.settings.pushNotifications);
        }
    }, [session, status, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch('/api/profile/notifications', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailNotifications, pushNotifications }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Notification settings updated successfully!');
            } else {
                setMessage(data.message || 'Failed to update notification settings.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Error updating notification settings:', error);
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
                    <h1 className="text-3xl font-bold mb-6 text-primary-foreground">Notification Settings</h1>
                    <div className="glass rounded-lg shadow-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <label htmlFor="emailNotifications" className="text-muted-foreground">Email Notifications</label>
                                <input
                                    type="checkbox"
                                    id="emailNotifications"
                                    checked={emailNotifications}
                                    onChange={(e) => setEmailNotifications(e.target.checked)}
                                    className="h-5 w-5 text-primary rounded border-gray-600 focus:ring-primary"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="pushNotifications" className="text-muted-foreground">Push Notifications</label>
                                <input
                                    type="checkbox"
                                    id="pushNotifications"
                                    checked={pushNotifications}
                                    onChange={(e) => setPushNotifications(e.target.checked)}
                                    className="h-5 w-5 text-primary rounded border-gray-600 focus:ring-primary"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 btn-primary rounded-lg shadow-md transition duration-300 focus-ring"
                            >
                                Save Settings
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