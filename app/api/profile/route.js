
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/app/utils/db';
import User from '@/models/User';

export async function PUT(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    await dbConnect();

    try {
        const { name, email, image } = await request.json();

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { name, email, image },
            { new: true }
        );

        if (!updatedUser) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Profile updated successfully', user: updatedUser }), { status: 200 });
    } catch (error) {
        console.error('Error updating profile:', error);
        return new Response(JSON.stringify({ message: 'Failed to update profile', error: error.message }), { status: 500 });
    }
}
