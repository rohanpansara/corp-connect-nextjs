// app/login/LoginForm.tsx
'use client'; // This line is important for client components

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use from 'next/navigation' in the app directory
import { apiClient } from '@/utils/apiClient';
import Image from 'next/image';
import illustration from '@/assets/illustration.png';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // Initialize the router

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Reset error message before submission

        try {
            const response = await apiClient.post('/user/login', { email, password }); // Ensure you are calling the correct path
            if (response.status === 200) {
                // Redirect to dashboard or another page after successful login
                router.push('/dashboard');
            }
        } catch (err: any) {
            console.error('Login failed:', err);
            setError(err.response?.data?.error || 'An unexpected error occurred.');
        }
    };


    return (
        <>
            <main className='flex w-[90%] h-screen min-h-screen bg-[#9BC4CB]'>
                <section className='flex w-1/2'>
                    {/* <Image src={illustration} alt="Illustration" layout="responsive" /> */}
                </section>
                <section className='flex w-1/2'>
                    <div className='w-full p-8'>
                        <div className='w-full h-full min-h-full bg-white shadow-lg rounded-[12px]'>
                            <div className='flex flex-col p-3 w-full h-full'>
                                <div className='flex h-[20%] w-full justify-center items-center text-pretty text-xl font-medium text-gray-300 bg-black rounded-lg p-5'>
                                    Log In To&nbsp;<span className='text-[#9BC4CB] font-bold'>CorpConnect</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section className='flex w-1/2'>
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" action="#" method="POST">
                                <div>
                                    <label about="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                    <div className="mt-2">
                                        <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label about="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                        <div className="text-sm">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Not a member?
                                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                            </p>
                        </div>
                    </div>
                </section> */}
            </main>
        </>
    );
};

export default LoginForm;
