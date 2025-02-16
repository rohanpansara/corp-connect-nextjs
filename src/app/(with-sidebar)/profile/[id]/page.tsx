import { Poppins } from 'next/font/google'
import { profileMetadata } from '@/app/metadata/profileMetadata'
import ProfileHeader from '@/components/profile/ProfileHeader'
import UserInfo from '@/components/profile/UserInfo'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = profileMetadata

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const { id } = params || { id: 'undefined' }

  return (
    <div
      className={`min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4 ${poppins.className}`}
    >
      <ProfileHeader id={id} />
      <UserInfo id={id} />
    </div>
  )
}

export default ProfilePage
