'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProfilePage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
        if (session) {
            setName(session.user.name || '');
            setEmail(session.user.email || '');
            setImage(session.user.image || '');
        }
    }, [session, status, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, image }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Profile updated successfully!');
                // Update session data in NextAuth.js
                update({ name, email, image });
            } else {
                setMessage(data.message || 'Failed to update profile.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Error updating profile:', error);
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
                    <h1 className="text-3xl font-bold mb-6 text-primary-foreground">Edit Profile</h1>
                    <div className="glass rounded-lg shadow-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-muted-foreground">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus-ring"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-muted-foreground">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus-ring"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-muted-foreground">Profile Image URL</label>
                                <input
                                    type="url"
                                    id="image"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus-ring"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 btn-primary rounded-lg shadow-md transition duration-300 focus-ring"
                            >
                                Update Profile
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