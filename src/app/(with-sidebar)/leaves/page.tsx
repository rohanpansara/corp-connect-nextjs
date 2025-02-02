import { leavesMetadata } from "@/app/metadata/leavesMetadata";
import PageHeader from "@/components/common/PageHeader";
export const metadata = leavesMetadata;

const LeavesPage = () => {
  const iconClassName = "h-[50px] w-[50px] text-cardTextColor";

  return (
    <div className="min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4">
      <div className="h-[30px] w-full max-w-full pl-2">
        <PageHeader pageName="Leaves" />
      </div>
    </div>
  );
};

export default LeavesPage;
