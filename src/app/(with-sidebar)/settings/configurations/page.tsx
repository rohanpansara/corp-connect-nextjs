import { settingsConfigurationMetadata } from "@/app/metadata/settingsMetadata";
import SettingsPageHeader from "@/components/common/SettingsPageHeader";

export const metadata = settingsConfigurationMetadata;

const SettingsConfigurations = () => {
  return (
    <div className="h-[calc(100vh-30px)] w-full bg-mainBackground flex flex-col items-center space-y-4 p-4">
      <div className="h-[30px] w-full max-w-full pl-2">
        <SettingsPageHeader />
      </div>
    </div>
  );
};

export default SettingsConfigurations;