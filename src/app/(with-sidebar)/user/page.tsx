import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

import { userMetadata } from '@/app/metadata/userMetadata';
export const metadata = userMetadata;

const UserPage = () => {
  return (
    <div className={`min-h-screen w-full bg-[#F8F6F4] flex items-center flex-col space-y-4 p-4 ${inter.className}`}>
    </div>
  );
};

export default UserPage;
