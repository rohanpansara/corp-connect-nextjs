// components/ui/card.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { apiClient } from '@/utils/apiClient';
import { Card, CardContent, CardDescription } from '@/components/ui/card'; // Ensure you import your card components
import toast from 'react-hot-toast';
import { PiTornadoThin } from "react-icons/pi";
import { FcClock, FcConferenceCall, FcLeave } from "react-icons/fc";

const Cards = () => {

    const fetchRef = useRef(false);

    const [cardsData, setCardsData] = useState<{ [key: string]: any } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const iconClassName = "h-[50px] w-[50px]";

    type CardTitle = 'Leaves Available' | 'Today’s Hours' | 'Next Meeting';

    const iconMap: Record<CardTitle, JSX.Element> = {
        'Leaves Available': <FcLeave className={iconClassName} />,
        'Today’s Hours': <FcClock className={iconClassName} />,
        'Next Meeting': <FcConferenceCall className={iconClassName} />,
    };

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
        <div className="flex justify-items-center items-center gap-[10px] max-w-[90%] w-full">
            {cardsData && Object.values(cardsData).map((card: any, index: number) => (
                <Card key={index} className="w-[200px] h-[100px] overflow-hidden p-4 border-none bg-[#e5e5e5] text-[#0A0A0A] shadow-lg rounded-md text-left mx-auto">
                    <CardContent className='p-0 h-full flex flex-row justify-between items-center my-auto'>
                        <CardDescription className='p-0 pr-2 flex'>
                            <span>
                                {/* Render icon based on card.title */}
                                {iconMap[card.title as CardTitle] || <PiTornadoThin className="h-[50px] w-[50px]" />} {/* Default icon */}
                            </span>
                        </CardDescription>
                        <CardDescription className='p-0 pl-2 flex jus flex-col justify-center items-left text-black'>
                            <span className='text-[14px] font-bold'>{card.value}</span>
                            <span className='text-[12px]'>{card.title}</span>
                        </CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Cards;
