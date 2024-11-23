// app/components/WelcomeHeaderWrapper.tsx (Server Component)
import { cookies } from "next/headers";
import WelcomeHeader from "./WelcomeHeader";

const WelcomeHeaderWrapper = () => {
  const cookieStore = cookies();

  // Retrieve the cookie value
  const cookieValue = cookieStore.get("User_Name")?.value || null;

  // If cookie value exists, replace '+' with space and decodeURIComponent
  const userName = cookieValue
    ? decodeURIComponent(cookieValue.replace(/\+/g, " "))
    : null;

  return <WelcomeHeader userName={userName} />;
};

export default WelcomeHeaderWrapper;
