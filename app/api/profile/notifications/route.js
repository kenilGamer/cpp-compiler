
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
        const { emailNotifications, pushNotifications } = await request.json();

        // In a real application, you would update the user's notification preferences in the database
        // For this example, we'll just return a success message
        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { 'settings.emailNotifications': emailNotifications, 'settings.pushNotifications': pushNotifications },
            { new: true }
        );

        if (!updatedUser) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Notification settings updated successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error updating notification settings:', error);
        return new Response(JSON.stringify({ message: 'Failed to update notification settings', error: error.message }), { status: 500 });
    }
}
