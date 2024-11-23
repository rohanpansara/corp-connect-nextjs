import { userMetadata } from "@/app/metadata/userMetadata";
import UserTable from "@/components/user/UserTable";
import { generateBreadcrumbsFromPathname } from "@/utils/generateBreadcrumbRoutes";
import { BreadcrumbCreator } from "@/components/common/Breadcrumb";
import { Poppins } from "next/font/google";
export const metadata = userMetadata;

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const UserPage = () => {
  const routes = generateBreadcrumbsFromPathname("/dashboard/users");

  return (
    <div
      className={`min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4 ${poppins.className}`}
    >
      <div className="flex w-full">
        <div className="flex justify-center items-center mr-auto">
          <BreadcrumbCreator routes={routes} />
        </div>
      </div>
      <div className="flex w-full">
      <UserTable />
      </div>
    </div>
  );
};

export default UserPage;
