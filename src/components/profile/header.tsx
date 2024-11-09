"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiClient } from "@/utils/apiClient";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { UserDTO } from "@/types/user";
import { getInitials } from "@/utils/getInitials";
import profileBackground from "../../assets/profile-background.jpg";

const ProfileHeader = ({ id }: { id: string }) => {
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
        <Avatar className="h-full w-full rounded-t-[10px]">
          <AvatarImage
            className="object-cover"
            src={profileBackground.src}
            alt="Profile Background"
          />
          <AvatarFallback>
            {getInitials(userHeaderData?.name || "") || "Profile Picture"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute top-[80px]">
        <Avatar className="h-[120px] w-[120px] rounded-full border-[5px] border-[#F8F6F4]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};

export default ProfileHeader;
