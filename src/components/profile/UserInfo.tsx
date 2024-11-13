"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiClient } from "@/app/api/apiClient";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { UserDTO } from "@/types/user";
import { getInitials } from "@/utils/getInitials";
import profileBackground from "../../assets/profile-background.jpg";

const UserInfo = ({ id }: { id: string }) => {
  const fetchRef = useRef(false);
  const router = useRouter();

  const [userHeaderData, setUserHeaderData] = useState<UserDTO>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserHeaderData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/employee/${id}`);
      setUserHeaderData(response.data.data);
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/auth/login");
          toast.error("You need to login first");
        } else {
          setError(
            `Error: ${err.response.status} - ${
              err.response.data.message || "Failed to fetch cards"
            }`
          );
        }
      } else if (err.request) {
        setError("Network error: Failed to receive a response");
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetchRef.current) {
      fetchUserHeaderData();
      fetchRef.current = true;
    }
  }, []);

  return (
    <>
      <div className="flex w-full h-[150px] p-2 pt-0">
        <div className="font-sans text-md">{userHeaderData?.name}</div>
      </div>
    </>
  );
};

export default UserInfo;
