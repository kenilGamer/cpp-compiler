
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/app/utils/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function PUT(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    await dbConnect();

    try {
        const { currentPassword, newPassword } = await request.json();

        const user = await User.findOne({ email: session.user.email });

        if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
            return new Response(JSON.stringify({ message: 'Invalid current password' }), { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return new Response(JSON.stringify({ message: 'Password updated successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error changing password:', error);
        return new Response(JSON.stringify({ message: 'Failed to change password', error: error.message }), { status: 500 });
    }
}
