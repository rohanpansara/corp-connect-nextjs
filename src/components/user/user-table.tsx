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
import { FaUserPen } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";
import { truncateText } from "@/utils/truncateText";
import { Checkbox } from "@/components/ui/checkbox"; // Import ShadCN Checkbox

import { UserDTO } from "@/types/user";
import { Button } from "../ui/button";
import AddUserDialog from "./add-user-dialog";
import DeleteDialog from "../delete-dialog";

const UserTable = () => {
  const fetchRef = useRef(false);
  const router = useRouter();
  const [usersData, setUsersData] = useState<UserDTO[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
      setSelectAll(false); // Unselect "Select All" if a user is deselected
    } else {
      updatedSelection.add(userId);
      if (updatedSelection.size === usersData.length) {
        setSelectAll(true); // Select "Select All" if all users are selected
      }
    }

    setSelectedUsers(updatedSelection);
  };

  const handleDeleteUsers = async () => {
    // Add your delete logic here (API call, etc.)
    console.log("Deleting users:", Array.from(selectedUsers));
    setIsDeleteDialogOpen(false); // Close the dialog after deletion
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <div className="flex w-full max-w-full">
        <div className="mr-auto">
          {/* Only show delete dialog if there are selected users */}
          {selectedUsers.size > 0 && (
            <DeleteDialog
              isOpen={isDeleteDialogOpen}
              onClose={() => setIsDeleteDialogOpen(false)} // Close without deleting
              entity="User"
              entityName={
                selectedUsers.size === 1 ? "User" : selectedUsers.size
              } // Dynamic name or count
              onDelete={handleDeleteUsers} // Call delete function when confirmed
            />
          )}
        </div>
        <div className="ml-auto">
          <AddUserDialog />
        </div>
      </div>
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
              <TableHead>Acct. Enabled</TableHead>
              <TableHead>Acct. Locked</TableHead>
              <TableHead>Actions</TableHead>
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
                <TableCell className="flex">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="plain"
                          className="border-[2px] p-2 border-primary text-primary mr-4 hover:text-gray-200 hover:bg-primary"
                        >
                          <FaUserPen />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Edit User</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="plain"
                          className="border-[2px] p-2 border-[#074F57] text-[#074F57] hover:text-gray-200 hover:bg-[#074F57]"
                        >
                          <BiSolidUserDetail />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>View User Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default UserTable;
