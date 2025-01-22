import { attendanceMetadata } from "@/app/metadata/attendanceMetadata";
import PageHeader from "@/components/common/PageHeader";
import SettingsWidgetsGrid from "@/components/settings/WidgetsGrid";

export const metadata = attendanceMetadata;

const SettingsPage = () => {
  return (
    <div className="h-[calc(100vh-30px)] w-full bg-mainBackground flex flex-col items-center space-y-4 p-4">
      <div className="h-[30px] w-full max-w-full">
        <PageHeader pageName="Settings" />
      </div>
      <div className="h-[calc(100vh-30px)] w-full flex items-center justify-center overflow-hidden">
        <SettingsWidgetsGrid />
      </div>
    </div>
  );
};

export default SettingsPage;
