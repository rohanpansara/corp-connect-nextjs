"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/getInitials";
import { FaUserEdit } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import github from "@/assets/github-default.jpg";
import { UserDTO } from "@/types/user";

interface UserAvatarProps {
  userHeaderData: UserDTO | undefined; // Ensure it's the correct type
}

const UserAvatar = ({ userHeaderData }: UserAvatarProps) => {
  const profileImageUrl = userHeaderData?.id
    ? `/images/users/${userHeaderData.id}.png`
    : undefined;

  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <div className="relative group cursor-pointer">
      <Avatar className="h-[120px] w-[120px] rounded-full border-[5px] border-[#F8F6F4]">
        <Image
          src={profileImageUrl || github.src}
          onError={(e) => (e.currentTarget.src = github.src)} // Fallback to default image on error
          width={500}
          height={500}
          alt="User avatar"
        />
        <AvatarFallback>
          {getInitials(userHeaderData?.name || "")}
        </AvatarFallback>
      </Avatar>

      <div
        className="max-h-[120px] max-w-[120px] absolute overflow-hidden inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        onClick={openDialog}
      >
        <FaUserEdit className="text-white text-2xl overflow-hidden" />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger />
        <DialogContent className="p-6">
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Here you can edit the user details.
          </DialogDescription>
          <Button onClick={closeDialog}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserAvatar;