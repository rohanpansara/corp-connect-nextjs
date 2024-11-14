import { useState } from "react";
import Image from "next/image";
import fallback from "@/assets/github-default.jpg"; // Ensure this path is correct

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
      setImgSrc(fallback.src); // Use fallback image here
      setHasError(true);
    }
  };

  return (
    <Image
    className="rounded-full"
      src={hasError ? fallback.src : imgSrc}
      alt={`${user?.name}`}
      width={30}
      height={30}
      objectFit="cover"
      onError={handleImageError}
      loading="lazy"
    />
  );
};

export default UserProfileImage;
