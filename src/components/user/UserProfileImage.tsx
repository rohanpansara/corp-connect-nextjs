import { useState } from "react";
import Image from "next/image";
import maleFallback from "./../../../public/images/users/default-male.png"; // Path to default male image
import femaleFallback from "./../../../public/images/users/default-female.png"; // Path to default female image
import { UserDTO } from "@/types/user";
interface UserImageProps {
  user: UserDTO;
}

const UserProfileImage: React.FC<UserImageProps> = ({ user }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Image
      className="rounded-full mx-auto"
      src={
        imageError
          ? user.gender === "female"
            ? femaleFallback
            : maleFallback
          : `/images/users/${user.id}.png`
      } // Use fallback image only if error occurs
      alt={`${user.name}'s profile`}
      width={30}
      height={30}
      objectFit="cover"
      onError={handleImageError}
      loading="lazy"
    />
  );
};

export default UserProfileImage;
