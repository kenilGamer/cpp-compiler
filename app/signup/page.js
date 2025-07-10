
import SignupForm from '@/app/components/SignupForm';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center">Create an Account</h1>
                <SignupForm />
            </div>
        </div>
    );
}
