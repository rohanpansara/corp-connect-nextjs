'use client'; // This is required for client-side components

import { useRouter } from 'next/navigation'; // 'next/navigation' used in Next.js 13+ for app directory
import { apiClient } from '@/utils/apiClient'; // Assuming you have an API client utility
import Image from "next/legacy/image"; // Import Image component from next/image
import illustration from '@/assets/illustration.png';
import { Formik, Field, Form, ErrorMessage } from 'formik'; // Import Formik components
import * as Yup from 'yup'; // For validation
import toast from 'react-hot-toast'; // Import toast
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';

const LoginForm = () => {

    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            router.push('/dashboard');
        }
    }, [router]);

    // Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid format')
            .required('*Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('*Password is required'),
    });

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            const response = await apiClient.post('/user/login', values);
            if (response.status === 200) {
                router.push('/dashboard');
                toast.success(response.data.message || 'Login successful');
            }
        } catch (err: any) {
            console.error('Login failed:', err);
            const errorMessage = "*" + err.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }
    };

    return (
        <main className="flex w-[90%] h-screen min-h-screen bg-[#0940AE] gap-x-10">
            {/* First Section: Office Illustration Image */}
            <section className="flex w-1/2 bg-cover bg-center xl:display-none">
                <Image src={illustration} alt="Illustration" objectFit='cover' />
            </section>

            {/* Second Section: Login Form */}
            <section className="flex w-1/2 justify-center items-center">
                <div className="w-full max-w-md p-6 bg-[#ECF1FE] shadow-lg rounded-[12px] items-center">
                    <h2 className="flex justify-center items-center text-2xl font-bold text-center text-gray-700 mb-[1px] bg-cover">
                        {/* <Image src={logo} alt='CorpConnect' className='flex mr-2 w-[10px] h-[5px]' objectFit='contain'></Image> */}
                        Welcome To&nbsp;<span className="text-[#407BFD]">CorpConnect</span>
                    </h2>
                    <span className='flex justify-center items-center text-[10px] text-center text-gray-400 mb-6'>Use credentials provided to you by the HR team</span>

                    {/* Formik Form */}
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            try {
                                await handleSubmit(values);
                            } catch (err) {
                                // Optionally set the error on Formik's field
                                setFieldError('email', (err as Error).message);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting, setFieldTouched, setFieldError, errors, touched }) => (
                            <Form className="space-y-6">
                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="flex flex-row justify-start items-center text-sm font-medium text-[#444e60d2] my-2">
                                        Email <ErrorMessage name="email" component="p" className="text-[#ff0800] text-xs ml-auto" />
                                    </label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        className={`mt-1 block w-full p-2 border ${errors.email && touched.email ? 'border-[#ff0800] placeholder:text-[#caadad]' : 'border-gray-300'} rounded-md shadow-sm text-[#444E60] sm:text-sm placeholder:text-[#babdc2]`}
                                        placeholder="Enter your email"
                                        onFocus={() => {
                                            setFieldTouched('email', false); // Clear "touched" status
                                            setFieldError('email', ''); // Clear error message on focus
                                        }}
                                    />
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="flex flex-row justify-start items-center text-sm font-medium text-[#444e60d2] my-2">
                                        Password <ErrorMessage name="password" component="p" className="text-[#ff0800] text-xs ml-auto " />
                                    </label>
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        className={`mt-1 block w-full p-2 border ${errors.password && touched.password ? 'border-[#ff0800] placeholder:text-[#caadad]' : 'border-gray-300'} rounded-md shadow-sm text-[#444E60] sm:text-sm placeholder:text-[#babdc2]`}
                                        placeholder="Enter your password"
                                        onFocus={() => {
                                            setFieldTouched('password', false); // Clear "touched" status
                                            setFieldError('password', ''); // Clear error message on focus
                                        }}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-[#407BFD] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#4a76d4] focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition delay-50"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Logging In...' : 'Log In'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-2 text-center">
                        <button type='button' className="text-xs text-[#407BFD] hover:text-[#4a76d4]">
                            Forgot password?
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default LoginForm;
