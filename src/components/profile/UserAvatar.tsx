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
    DialogClose,
  } from "@/components/ui/dialog";
  import { useState } from "react";
  import { Button } from "@/components/ui/button";

  function UserAvatar({ userHeaderData }: any) {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    return (
      <div className="relative group cursor-pointer">
        <Avatar className="h-[120px] w-[120px] rounded-full border-[5px] border-[#F8F6F4]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {getInitials(userHeaderData?.name || "")}
          </AvatarFallback>
        </Avatar>

        {/* Edit Icon - Only visible on hover */}
        <div
          className="max-h-[120px] max-w-[120px] absolute overflow-hidden inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          onClick={openDialog}
        >
          <FaUserEdit className="text-white text-2xl overflow-hidden" />
        </div>

        {/* Dialog */}
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
  }

  export default UserAvatar;
