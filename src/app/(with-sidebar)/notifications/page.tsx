"use client";
import { apiClient } from "@/app/api/apiClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const NotificationPage = () => {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Construct the WebSocket URL with the token as a query parameter
    const socket = new WebSocket("ws://localhost:8089/api/auth/ws");

    // Handle connection opening
    socket.onopen = () => {
      console.log("Connected to the WebSocket server");
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Notification received:", data);
      setCount((prev) => prev + 1);
      setNotifications((prev) => [...prev, data]);
    };

    // Handle connection errors
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Handle connection closure
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    // Handle updates when notifications change
    console.log("Notifications:", notifications);
  }, [notifications]);

  const handleClick = async () => {
    const response = await apiClient.post(
        "/update/update-socket",
        JSON.stringify({count:count})
      );
      console.log(response?.data);
  };

  return (
    <div
      className={`min-h-screen w-full bg-mainBackground flex items-center flex-col gap-6 p-6 ${poppins.className}`}
    >
      {/* Click Button */}
      <Button onClick={handleClick} className="w-12 h-8">
        {count}
      </Button>

      {/* Notifications Card */}
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <h1 className="text-xl font-semibold">Notifications</h1>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {notifications.length > 0 ? (
              notifications.map((note, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span>{note?.message}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No new notifications</p>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPage;
