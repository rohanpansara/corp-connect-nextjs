"use client";

import { fetchUsersData } from "@/app/api/fetchers/fetchAllUsers";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FcCancel, FcOk } from "react-icons/fc";
import { Checkbox } from "../ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { DataTable } from "@/app/(with-sidebar)/users/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserDTO } from "@/contracts/types/user";
import {
  PiDotsThreeOutlineVerticalLight,
  PiIdentificationBadgeLight,
  PiPencilSimpleLineLight,
  PiTrashLight,
} from "react-icons/pi";
import { TiUserAdd } from "react-icons/ti";
import DeleteDialog from "../common/DeleteDialog";
import AddUserDialog from "./AddUserDialog";
import UserProfileImage from "./UserProfileImage";

const UserTable = () => {
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
    fetchUsersData({
      setUsersData,
      setError,
      setLoading,
      onNavigate: handleNavigation,
    });
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

  const columns: ColumnDef<UserDTO>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox checked={selectAll} onClick={handleSelectAll} />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="mr-auto"
          checked={selectedUsers.has(row.original.id)}
          onClick={() => handleSelectUser(row.original.id)}
        />
      ),
    },
    {
      accessorKey: "profile",
      header: "Profile",
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <UserProfileImage user={row?.original} />
            </TooltipTrigger>
            <TooltipContent>{row.original?.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>{row.original?.name}</span>
            </TooltipTrigger>
            <TooltipContent>{row.original?.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "roles",
      header: "Roles",
      cell: ({ row }) => row.original?.roles,
    },
    {
      accessorKey: "createdDate",
      header: "Created Date",
      cell: ({ row }) => row.original?.createdDate,
    },
    {
      id: "isAccountEnabled",
      header: "Enabled",
      cell: ({ row }) => (
        <div className="w-full pl-2">
          {row.original?.isAccountEnabled === "true" ? (
            <FcOk className="h-4 w-4" />
          ) : (
            <FcCancel className="h-4 w-4" />
          )}
        </div>
      ),
    },    
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="plain" size="nothing">
                <PiDotsThreeOutlineVerticalLight />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-34">
              <DropdownMenuLabel className="text-xs">
                User Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="text-xs">
                <DropdownMenuItem className="group">
                  <Button
                    variant="plain"
                    size="nothing"
                    className="text-xs flex justify-start items-center w-full"
                  >
                    <PiIdentificationBadgeLight className="group-hover:text-green-500" />
                    <span>View Profile</span>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="group">
                  <Button
                    variant="plain"
                    size="nothing"
                    className="text-xs flex justify-start items-center w-full"
                  >
                    <PiPencilSimpleLineLight className="group-hover:text-blue-500" />
                    <span>Edit</span>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="group">
                  <Button
                    variant="plain"
                    size="nothing"
                    className="text-xs flex justify-start items-center w-full"
                  >
                    <PiTrashLight className="group-hover:text-red-500" />
                    <span>Remove</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="mr-auto">
          <DeleteDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            entity="User"
            entitySize={selectedUsers.size}
            all={selectedUsers.size === usersData.length}
            onDelete={() => console.log("Deleted")}
          />
          {selectedUsers.size > 0 && (
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <FaTrashAlt />
              {selectedUsers.size === usersData.length
                ? `Delete All (${selectedUsers.size})`
                : `Delete Selected (${selectedUsers.size})`}
            </Button>
          )}
        </div>
        <div className="ml-auto ">
          <AddUserDialog
            isOpen={isAddUserDialogOpen}
            onClose={() => setIsAddUserDialogOpen(false)}
          />
          <Button
            variant="default"
            onClick={() => setIsAddUserDialogOpen(true)}
          >
            <TiUserAdd />
            Add
          </Button>
        </div>
      </div>
      <div className="py-4">
        <DataTable columns={columns} data={usersData} />
      </div>
    </div>
  );
};

export default UserTable;
