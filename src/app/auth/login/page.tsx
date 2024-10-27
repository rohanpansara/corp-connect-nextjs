import LoginForm from '@/components/login-form';

export const metadata = {
    title: 'Login | CorpConnect',
    description: 'Login to your CorpConnect account',
};

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-[#0940AE] flex items-center justify-center">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
