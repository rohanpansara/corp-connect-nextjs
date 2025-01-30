import { settingsMetadata } from "@/app/metadata/settingsMetadata";
import PageHeader from "@/components/common/PageHeader";
import SettingsWidgetsGrid from "@/components/settings/SettingsWidgetsGrid";

export const metadata = settingsMetadata;

const SettingsPage = () => {
  return (
    <div className="h-[calc(100vh-30px)] w-full bg-mainBackground flex flex-col items-center space-y-4 p-4">
      <div className="h-[30px] w-full max-w-full pl-2">
        <PageHeader pageName="Settings" />
      </div>
      <div className="h-[calc(100vh-30px)] w-full flex items-center justify-center overflow-hidden p-2">
        <SettingsWidgetsGrid />
      </div>
    </div>
  );
};

export default SettingsPage;
