"use client";

import { usePathname } from "next/navigation";
import { CustomBreadcrumb, RouteDataProp } from "./CustomBreadcrumb";

const SettingsPageHeader = () => {
  const pathname = usePathname();

  // Convert pathname into breadcrumb format
  const breadcrumb: RouteDataProp[] = pathname
    .split("/")
    .filter((segment) => segment) // Remove empty segments
    .map((segment, index, arr) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize first letter
      path: "/" + arr.slice(0, index + 1).join("/"), // Construct URL for each segment
    }));

  return (
    <div className={`flex flex-col justify-start px-1 text-gray-600 dark:text-gray-400`}>
      <CustomBreadcrumb routes={breadcrumb} />
    </div>
  );
};

export default SettingsPageHeader;
