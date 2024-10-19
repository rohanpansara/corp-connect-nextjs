"use client"

import { CookiesProvider } from 'react-cookie'; // Import CookiesProvider
import LoginForm from '@/components/LoginForm';

const LoginPage = () => {
    return (
        <CookiesProvider> {/* Wrap your application with CookiesProvider */}
            <div className="min-h-screen bg-[#0940AE] flex items-center justify-center">
                <LoginForm />
            </div>
        </CookiesProvider>
    );
};

export default LoginPage;
