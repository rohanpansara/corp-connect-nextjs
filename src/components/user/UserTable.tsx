"use client";

import React, { useState, useEffect, useRef } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import { BiSolidUserDetail } from "react-icons/bi";
import { FcOk } from "react-icons/fc";
import { TbUserPlus } from "react-icons/tb";
import { fetchUsersData } from "@/app/api/fetchers/fetchAllUsers";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FaUserPen } from "react-icons/fa6";
import { DataTable } from "@/app/(with-sidebar)/users/data-table";
import AddUserDialog from "./AddUserDialog";
import UserProfileImage from "./UserProfileImage";
import DeleteDialog from "../common/DeleteDialog";
import { UserDTO } from "@/contracts/types/user";

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
            <TooltipContent>{row?.original?.name}</TooltipContent>
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
              <span>{row.original.name}</span>
            </TooltipTrigger>
            <TooltipContent>{row.original.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "roles",
      header: "Roles",
      cell: ({ row }) => row.original.roles,
    },
    {
      accessorKey: "createdDate",
      header: "Created Date",
      cell: ({ row }) => row.original.createdDate,
    },
    {
      id: "isAccountEnabled",
      header: "Acct. Enabled",
      cell: ({ row }) => <FcOk className="h-4 w-4" />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex">
          <Button
            variant="plain"
            size="plain"
            className="mr-6"
            onClick={() => console.log("Edit", row.original.id)}
          >
            <FaUserPen />
          </Button>
          <Button
            variant="plain"
            size="plain"
            onClick={() => router.push(`/profile/${row.original.id}`)}
          >
            <BiSolidUserDetail />
          </Button>
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
            <TbUserPlus />
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
