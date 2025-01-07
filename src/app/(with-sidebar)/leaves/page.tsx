import { leavesMetadata } from "@/app/metadata/leavesMetadata";
import PageHeader from "@/components/common/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IoCalendarOutline } from "react-icons/io5";
export const metadata = leavesMetadata;

const LeavesPage = () => {
  const iconClassName = "h-[50px] w-[50px] text-cardTextColor";

  return (
    <div className="min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4">
      <PageHeader pageName="Leave"/>
    </div>
  );
};

export default LeavesPage;
