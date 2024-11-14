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
import { FcCancel, FcOk } from "react-icons/fc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserLargeSlash, FaUserPen } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";
import { TbUserPlus } from "react-icons/tb";
import { truncateText } from "@/utils/truncateText";
import { Checkbox } from "@/components/ui/checkbox"; // Import ShadCN Checkbox

import { UserDTO } from "@/types/user";
import { Button } from "../ui/button";
import AddUserDialog from "./AddUserDialog";
import DeleteDialog from "../DeleteDialog";
import { fetchUsersData } from "@/app/api/fetchers/fetchAllUsers";
import { deleteUsers } from "@/app/api/handlers/DeleteUsersSubmit";
import { Switch } from "@radix-ui/react-switch";
import UserProfileImage from "./UserProfileImage";
import { FaTrashAlt } from "react-icons/fa";

const UserTable = () => {
  const fetchRef = useRef(false);
  const router = useRouter();
  const [usersData, setUsersData] = useState<UserDTO[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleNavigation = (path: string) => router.push(path);

  useEffect(() => {
    if (!fetchRef.current) {
      fetchRef.current = true;
      fetchUsersData({
        setUsersData,
        setError,
        setLoading,
        onNavigate: handleNavigation,
      });
    }
  }, []);

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
      setSelectAll(false);
    } else {
      updatedSelection.add(userId);
      if (updatedSelection.size === usersData.length) {
        setSelectAll(true);
      }
    }

    setSelectedUsers(updatedSelection);
  };

  const handleDeleteUsers = async () => {
    try {
      await deleteUsers(Array.from(selectedUsers));
      setUsersData(usersData.filter((user) => !selectedUsers.has(user.id)));
      setSelectedUsers(new Set());
    } catch (error) {
      setError("Failed to delete selected users.");
    }
    setIsDeleteDialogOpen(false);
  };

  const handleToggleAccountStatus = async (userId: string, status: boolean) => {
    try {
      setUsersData((prevData) =>
        prevData.map((user) =>
          user.id === userId
            ? { ...user, isAccountEnabled: status ? "true" : "false" }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleToggleAccountLockStatus = async (
    userId: string,
    status: boolean
  ) => {
    try {
      setUsersData((prevData) =>
        prevData.map((user) =>
          user.id === userId
            ? { ...user, isAccountNonLocked: status ? "true" : "false" }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating lock status:", error);
    }
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <div className="flex w-full max-w-full">
        <div className="mr-auto">
          {/* Ensure the DeleteDialog is rendered only when isDeleteDialogOpen is true */}
          {selectedUsers.size > 0 && (
            <>
              <DeleteDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)} // Close without deleting
                entity="User"
                entityName={
                  selectedUsers.size === 1 ? "User" : selectedUsers.size
                } // Dynamic name or count
                onDelete={handleDeleteUsers} // Call delete function when confirmed
              />
              {usersData?.length > 1 && (
                <Button
                  variant="destructive"
                  onClick={() => setIsDeleteDialogOpen(true)} // Open delete dialog
                  disabled={selectedUsers.size === 0} // Disable the button if no users are selected
                >
                  <FaTrashAlt />
                  {selectedUsers.size === usersData.length
                    ? `Delete All (${selectedUsers.size})`
                    : `Delete Selected (${selectedUsers.size})`}
                </Button>
              )}
            </>
          )}
        </div>
        <div className="ml-auto">
          <AddUserDialog
            isOpen={isAddUserDialogOpen}
            onClose={() => setIsAddUserDialogOpen(false)}
          />
          <Button
            variant="default"
            onClick={() => setIsAddUserDialogOpen(true)}
          >
            <TbUserPlus />
            Add
          </Button>
        </div>
      </div>
      <div className="flex w-full max-w-full">
        <Table className="border-[1px]">
          <TableHeader>
            <TableRow className="h-10 text-[12px]">
              <TableHead className="text-center">
                <Checkbox checked={selectAll} onClick={handleSelectAll} />
              </TableHead>
              <TableHead className="text-center max-w-[60px] w-[60px]">
                Profile
              </TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center w-[100px] max-w-[100px]">
                Roles
              </TableHead>
              <TableHead className="text-center">Created Date</TableHead>
              <TableHead className="text-center w-[140px] max-w-[140px]">
                Acct. Enabled
              </TableHead>
              <TableHead className="text-center w-[140px] max-w-[140px]">
                Acct. Locked
              </TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData.map((user) => (
              <TableRow
                key={user?.id}
                className={`h-10 ${
                  selectedUsers.has(user.id)
                    ? "bg-blue-100 hover:bg-blue-100 dark:bg-blue-900" // Custom background color for selected rows
                    : ""
                }`}
              >
                <TableCell className="text-center">
                  {usersData != undefined && usersData?.length > 0 && (
                    <Checkbox
                      checked={selectedUsers.has(user.id)}
                      onClick={() => handleSelectUser(user.id)}
                    />
                  )}
                </TableCell>
                <TableCell className="text-center max-w-[60px] w-[60px]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <UserProfileImage user={user} />
                      </TooltipTrigger>
                      <TooltipContent>{user?.name}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-center font-medium overflow-hidden">
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
                {/* <TableCell className="overflow-hidden">
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
                </TableCell> */}
                <TableCell className="text-center overflow-hidden w-[100px] max-w-[100px]">
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
                <TableCell className="text-center overflow-hidden">
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
                <TableCell className="text-center w-[140px] max-w-[140px]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            {user.isAccountEnabled === "true" ? (
                              <FcOk className="h-[16px] w-[16px]" />
                            ) : (
                              <FcCancel className="h-[16px] w-[16px] text-red-500" />
                            )}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Switch
                                checked={user.isAccountEnabled === "true"}
                                onCheckedChange={(checked) =>
                                  handleToggleAccountStatus(user.id, checked)
                                }
                              >
                                {user.isAccountEnabled === "true"
                                  ? "Disable Account"
                                  : "Enable Account"}
                              </Switch>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {user.isAccountEnabled === "true"
                            ? "Disable Account"
                            : "Enable Account"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-center w-[140px] max-w-[140px]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            {user.isAccountNonLocked === "true" ? (
                              <FcOk className="h-[16px] w-[16px]" />
                            ) : (
                              <FcCancel className="h-[16px] w-[16px] text-red-500" />
                            )}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Switch
                                checked={user.isAccountNonLocked === "true"}
                                onCheckedChange={(checked) =>
                                  handleToggleAccountLockStatus(
                                    user.id,
                                    checked
                                  )
                                }
                              >
                                {user.isAccountNonLocked === "true"
                                  ? "Unlock Account"
                                  : "Lock Account"}
                              </Switch>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {user.isAccountNonLocked === "true"
                            ? "Lock Account"
                            : "Unlock Account"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-center">
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
                        <p>View User Profile</p>
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
