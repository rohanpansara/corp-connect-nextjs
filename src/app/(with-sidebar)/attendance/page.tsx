import { attendanceMetadata } from '@/app/metadata/attendanceMetadata'
import PageHeader from '@/components/common/PageHeader'

export const metadata = attendanceMetadata

const AttendancePage = () => {
  return (
    <div className='min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4'>
      <div className='h-[30px] w-full max-w-full pl-2'>
        <PageHeader pageName='Attendance' />
      </div>
    </div>
  )
}

export default AttendancePage
