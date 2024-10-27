"use client"
import { useEffect, useState, useRef } from 'react';
import { apiClient } from '@/utils/apiClient';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';

export const DashboardPage = () => {
    const [cardsData, setCardsData] = useState<{ [key: string]: any } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchRef = useRef(false);

    const fetchCardsData = async () => {
        try {
            const response = await apiClient.get('/dashboard/cards');
            setCardsData(response.data.data);
        } catch (err: any) {
            if (err.response) {
                // Server responded with a status other than 200 range
                setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to fetch cards'}`);
            } else if (err.request) {
                // Request was made but no response was received
                setError('Network error: Failed to receive a response');
            } else {
                // Something else caused the error
                setError(`Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!fetchRef.current) {
            fetchCardsData();
            fetchRef.current = true;
        }
    }, []);

    if (loading) return <p className="text-white text-center">Loading...</p>;
    if (error) {
        toast.error(error); // Show error message using react-hot-toast
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-[#0940AE] flex items-center justify-center flex-col space-y-6 p-6">
            <h1 className="text-white text-3xl font-semibold mb-8">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl w-full">
                {cardsData && Object.values(cardsData).map((card: any, index: number) => (
                    <Card key={index} className="bg-white shadow-lg rounded-lg">
                        <CardContent>
                            <CardTitle className="text-xl font-bold text-blue-800">{card.title}</CardTitle>
                            <p className="text-gray-500 text-2xl font-semibold">{card.value}</p>
                            <CardDescription className="text-gray-400">{card.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
