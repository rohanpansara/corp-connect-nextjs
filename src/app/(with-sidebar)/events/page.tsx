import { eventsMetadata } from '@/app/metadata/eventsMetadata'
import PageHeader from '@/components/common/PageHeader'
export const metadata = eventsMetadata

const EventsPage = () => {
  return (
    <div className='min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4'>
      <div className='h-[30px] w-full max-w-full pl-2'>
        <PageHeader pageName='Events' />
      </div>
    </div>
  )
}

export default EventsPage
