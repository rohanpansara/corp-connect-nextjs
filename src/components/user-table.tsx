"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiClient } from "@/utils/apiClient";
import toast from "react-hot-toast";
import { FaUserSlash, FaUser } from "react-icons/fa";
import { truncateText } from "@/utils/truncateText";
import { Checkbox } from "@/components/ui/checkbox"; // Import ShadCN Checkbox

import { UserDTO } from "@/types/user";

const UserTable = () => {
  const fetchRef = useRef(false);
  const router = useRouter();
  const [usersData, setUsersData] = useState<UserDTO[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fetchRef.current) {
      fetchRef.current = true;
      fetchUsersData();
    }
  }, []);

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/employee");
      if (response.data?.data) {
        setUsersData(response.data.data);
      } else {
        setError("No data found");
      }
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

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers(new Set());
    } else {
      const allUserIds = usersData.map((user) => user.id);
      setSelectedUsers(new Set(allUserIds));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectUser = (userId: string) => {
    const updatedSelection = new Set(selectedUsers);
    if (updatedSelection.has(userId)) {
      updatedSelection.delete(userId);
    } else {
      updatedSelection.add(userId);
    }
    setSelectedUsers(updatedSelection);
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="flex w-full max-w-full">
      <Table className="border-[1px]">
        <TableHeader>
          <TableRow className="h-10 text-[12px]">
            <TableHead className="text-center">
              <Checkbox checked={selectAll} onClick={handleSelectAll} />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Account Enabled</TableHead>
            <TableHead>Account Locked</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((user) => (
            <TableRow key={user?.id} className="h-10">
              <TableCell className="text-center">
                <Checkbox
                  checked={selectedUsers.has(user.id)}
                  onClick={() => handleSelectUser(user.id)}
                />
              </TableCell>
              <TableCell className="font-medium overflow-hidden">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-[12px] text-center font-semibold cursor-default">
                        {truncateText(user?.name, 20)}
                      </span>
                    </TooltipTrigger>
                    {user?.name?.length > 20 && (
                      <TooltipContent className="max-w-[500px]">
                        <p>{user?.name}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="overflow-hidden">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-[12px] text-center cursor-default">
                        {truncateText(user?.email, 30)}
                      </span>
                    </TooltipTrigger>
                    {user?.email?.length > 30 && (
                      <TooltipContent className="max-w-[500px]">
                        <p>{user?.email}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="overflow-hidden">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-[12px] text-center cursor-default">
                        {truncateText(user?.roles, 20)}
                      </span>
                    </TooltipTrigger>
                    {user?.roles?.length > 20 && (
                      <TooltipContent className="max-w-[500px]">
                        <p>{user?.roles}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="overflow-hidden">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-[12px] text-center cursor-default">
                        {truncateText(user?.createdDate, 30)}
                      </span>
                    </TooltipTrigger>
                    {user?.createdDate?.length > 30 && (
                      <TooltipContent className="max-w-[500px]">
                        <p>{user?.createdDate}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                {user?.isAccountEnabled === "true" ? (
                  <FaUser className="ml-10 text-green-500" />
                ) : (
                  <FaUserSlash className="ml-5 text-red-500" />
                )}
              </TableCell>
              <TableCell>
                {user?.isAccountNonLocked === "true" ? (
                  <FaUser className="ml-10 text-green-500" />
                ) : (
                  <FaUserSlash className="ml-10 text-red-500" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
