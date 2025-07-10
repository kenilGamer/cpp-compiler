
import dbConnect from '@/app/utils/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(request) {
    await dbConnect();
    try {
        const { email, password } = await request.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: 'User with this email already exists' }), {
                status: 409,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });
        return new Response(JSON.stringify({ id: newUser._id, email: newUser.email }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'User registration failed', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
