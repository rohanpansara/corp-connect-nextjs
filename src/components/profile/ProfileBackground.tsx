import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/getInitials";
import profileBackground from "../../assets/profile-background.jpg";

function ProfileBackground({ userHeaderData }: any) {
  return (
    <>
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
    </>
  );
}

export default ProfileBackground;
