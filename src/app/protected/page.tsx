// pages/protected.tsx
import { GetServerSideProps } from 'next';
import cookie from 'cookie';

export default function ProtectedPage() {
    return <div>Welcome to the protected page!</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = context.req.headers.cookie;

    if (!cookies) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    const parsedCookies = cookie.parse(cookies);
    const accessToken = parsedCookies.accessToken;

    if (!accessToken) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    // You can now verify the token or fetch user data here

    return {
        props: {}, // Pass any data to the page here
    };
};
