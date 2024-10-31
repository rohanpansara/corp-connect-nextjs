import LoginForm from '@/components/login-form';

import { loginMetadata } from '@/app/metadata/loginMetadata';
export const metadata = loginMetadata;

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-[#0940AE] flex items-center justify-center">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
