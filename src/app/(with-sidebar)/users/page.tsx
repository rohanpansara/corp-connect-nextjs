import { userMetadata } from "@/app/metadata/usersMetadata";
import PageHeader from "@/components/common/PageHeader";
import UserTable from "@/components/user/UserTable";
import { Poppins } from "next/font/google";
export const metadata = userMetadata;

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const UserPage = () => {
  return (
    <div
      className={`h-[calc(100vh-30px)] w-full bg-mainBackground flex items-center flex-col space-y-4 p-4 ${poppins.className}`}
    >
      <div className="h-[30px] w-full max-w-full">
        <PageHeader pageName="Users" />
      </div>
      <div className="flex w-full">
        <UserTable />
      </div>
    </div>
  );
};

export default UserPage;
