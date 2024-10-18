'use client'; // This is required for client-side components

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 'next/navigation' used in Next.js 13+ for app directory
import { apiClient } from '@/utils/apiClient'; // Assuming you have an API client utility

const LoginForm = () => {
    const [email, setEmail] = useState('');       // State for email
    const [password, setPassword] = useState(''); // State for password
    const [error, setError] = useState('');       // State for error messages
    const router = useRouter();                   // Router to navigate after login

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            // Sending POST request to login endpoint
            const response = await apiClient.post('/user/login', { email, password });

            if (response.status === 200) {
                // Redirect to dashboard or any other page after successful login
                router.push('/dashboard');
            }
        } catch (err: any) {
            // Handle error response
            console.error('Login failed:', err);
            setError(err.response?.data?.error || 'An unexpected error occurred.');
        }
    };

    return (
        <>
            <main className="flex w-[90%] h-screen min-h-screen bg-[#9BC4CB]">
                {/* First Section */}
                <section className="flex w-1/2 bg-cover bg-center">
                    {/* You can uncomment the Image below and add an illustration */}
                    {/* <Image src={illustration} alt="Illustration" layout="responsive" /> */}
                </section>

                {/* Second Section: Login Form */}
                <section className="flex w-1/2 justify-center items-center">
                    <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-[12px]">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                            Log In to <span className="text-[#9BC4CB]">CorpConnect</span>
                        </h2>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your password"
                                />
                            </div>

                            {/* Display error message */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>

                        {/* Extra links */}
                        <div className="mt-4 text-center">
                            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default LoginForm;
