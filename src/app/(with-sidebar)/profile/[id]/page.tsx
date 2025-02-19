import { Poppins } from 'next/font/google'
import { profileMetadata } from '@/app/metadata/profileMetadata'
import ProfileHeader from '@/components/profile/ProfileHeader'
import UserInfo from '@/components/profile/UserInfo'
import { getCookieAsString } from '@/utils/cookieUtils'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = profileMetadata

const ProfilePage = () => {
  const userId = getCookieAsString('User_Id')

  return (
    <div
      className={`min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4 ${poppins.className}`}
    >
      <ProfileHeader id={userId} />
      <UserInfo id={userId} />
    </div>
  )
}

export default ProfilePage
