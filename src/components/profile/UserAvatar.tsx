import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/getInitials";

function UserAvatar({ userHeaderData }: any) {
  return (
    <>
      <Avatar className="h-[120px] w-[120px] rounded-full border-[5px] border-[#F8F6F4]">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          {getInitials(userHeaderData?.name || "")}
        </AvatarFallback>
        {/* TODO: Edit Icon - Only visible on hover */}
      </Avatar>
    </>
  );
}

export default UserAvatar;
