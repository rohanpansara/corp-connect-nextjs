import { Inter } from "next/font/google";
import { profileMetadata } from "@/app/metadata/profileMetadata";
import ProfileHeader from "@/components/profile/ProfileHeader";
import UserInfo from "@/components/profile/UserInfo";

const inter = Inter({ subsets: ["latin"] });
export const metadata = profileMetadata;

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const { id } = params || { id: "undefined" };

  return (
    <div
      className={`min-h-screen w-full bg-[#F8F6F4] flex items-center flex-col space-y-4 p-4 ${inter.className}`}
    >
      <ProfileHeader id={id} />
      <UserInfo id={id}/>
    </div>
  );
};

export default ProfilePage;
