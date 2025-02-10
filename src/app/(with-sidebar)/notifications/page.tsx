"use client";
import { apiClient } from "@/app/api/apiClient";
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
    const socket = new WebSocket("ws://192.168.24.101:8089/api/auth/ws");

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
      className={`min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4 ${poppins.className}`}
    >
      <button
        style={{ width: "40px", height: "30px" }}
        type="button"
        value={count}
        onClick={handleClick}
      >
        {count}
      </button>
      <div>
        <h1>Notifications</h1>
        <ul>
          {notifications.map((note, index) => (
            <li key={index}>
              {note?.message} {note?.user && " " + note.user}{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationPage;
