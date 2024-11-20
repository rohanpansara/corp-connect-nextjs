import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { userMetadata } from "@/app/metadata/userMetadata";
import UserTable from "@/components/user/UserTable";
import { generateBreadcrumbsFromPathname } from "@/utils/generateBreadcrumbRoutes";
import { BreadcrumbCreator } from "@/components/common/breadcrumb";
export const metadata = userMetadata;

const UserPage = () => {

   const routes = generateBreadcrumbsFromPathname("/dashboard/users");

  return (
    <div
      className={`min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4 ${inter.className}`}
    >
      <div className="flex w-full">
        <div className="flex justify-center items-center mr-auto">
        <BreadcrumbCreator routes={routes}/>
        </div>
      </div>
      <UserTable />
    </div>
  );
};

export default UserPage;
