import { Inter } from "next/font/google";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TbUserPlus } from "react-icons/tb";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

import { userMetadata } from "@/app/metadata/userMetadata";
import UserTable from "@/components/user/user-table";
import { Button } from "@/components/ui/button";
export const metadata = userMetadata;

const UserPage = () => {
  return (
    <div
      className={`min-h-screen w-full bg-[#F8F6F4] flex items-center flex-col space-y-4 p-4 ${inter.className}`}
    >
      <div className="flex w-full">
        <div className="flex justify-center items-center mr-auto">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/user">Users</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        </div>
      </div>
      <UserTable />
    </div>
  );
};

export default UserPage;
