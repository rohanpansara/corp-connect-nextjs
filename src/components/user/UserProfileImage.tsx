import { UserImageProps } from '@/types/UserImageProps'
import Image from 'next/image'
import { useState } from 'react'
import femaleFallback from './../../../public/images/users/default-female.png' // Path to default female image
import maleFallback from './../../../public/images/users/default-male.png' // Path to default male image

const UserProfileImage: React.FC<UserImageProps> = ({ user }) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Image
      className='rounded-full mr-auto'
      src={imageError ? (user.gender === 'female' ? femaleFallback : maleFallback) : `/images/users/${user.id}.png`}
      alt={`${user.name}'s profile`}
      width={30}
      height={30}
      objectFit='cover'
      onError={handleImageError}
      // loading="lazy"
    />
  )
}

export default UserProfileImage
