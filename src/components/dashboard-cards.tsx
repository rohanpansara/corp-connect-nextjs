// components/ui/card.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { apiClient } from '@/utils/apiClient';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'; // Ensure you import your card components
import toast from 'react-hot-toast';
import { Poppins } from 'next/font/google';

const Cards = () => {

    const fetchRef = useRef(false);

    const [cardsData, setCardsData] = useState<{ [key: string]: any } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCardsData = async () => {
        try {
            const response = await apiClient.get('/dashboard/cards');
            setCardsData(response.data.data);
        } catch (err: any) {
            if (err.response) {
                setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to fetch cards'}`);
            } else if (err.request) {
                setError('Network error: Failed to receive a response');
            } else {
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
        toast.error(error);
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
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
    );
};

export default Cards;
