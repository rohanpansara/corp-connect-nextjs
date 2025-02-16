import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const PageHeader = ({ pageName }: { pageName: string | null }) => {
  return (
    <div className={`flex justify-start items-end px-1 text-gray-600 dark:text-gray-400 ${poppins.className}`}>
      <div className='text-lg font-semibold'>{pageName ? `Manage ${pageName}` : 'Loading...'}</div>
    </div>
  )
}

export default PageHeader
