import { useState } from "react";
import Image from "next/image";
import fallback from "@/assets/github-default.jpg"; // Ensure this path is correct
import { getInitials } from "@/utils/getInitials";

// Define an interface for the user prop
interface User {
  id: string;
  name: string;
}

interface UserImageProps {
  user: User;
}

const UserProfileImage: React.FC<UserImageProps> = ({ user }) => {
  const [imgSrc, setImgSrc] = useState(`/images/users/${user?.id}.png`);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setImgSrc(fallback.src);
      setHasError(true);
    }
  };

  return (
    <Image
    className="rounded-full mx-auto"
      src={hasError ? fallback.src : imgSrc}
      alt={`${getInitials(user?.name)}`}
      width={30}
      height={30}
      objectFit="cover"
      onError={handleImageError}
      loading="lazy"
    />
  );
};

export default UserProfileImage;
