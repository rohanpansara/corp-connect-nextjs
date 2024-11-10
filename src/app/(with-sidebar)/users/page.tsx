import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

import { userMetadata } from "@/app/metadata/userMetadata";
import UserTable from "@/components/user/user-table";
import { BreadcrumbCreator } from "@/components/breadcrumb";
import { generateBreadcrumbsFromPathname } from "@/utils/generateBreadcrumbRoutes";
export const metadata = userMetadata;

const UserPage = () => {

   // Generate breadcrumbs dynamically from the current pathname
   const routes = generateBreadcrumbsFromPathname("/dashboard/users");

  return (
    <div
      className={`min-h-screen w-full bg-[#F8F6F4] flex items-center flex-col space-y-4 p-4 ${inter.className}`}
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
