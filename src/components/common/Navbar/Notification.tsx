import { MenubarShortcut } from '@/components/ui/menubar'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@radix-ui/react-menubar'
import { FaCalendarCheck } from 'react-icons/fa'
import { MdMarkEmailRead } from 'react-icons/md'
import { PiBellSimpleLight } from 'react-icons/pi'
import { AppNotification } from './wrappers/NotificationWrapper'

interface NotificationProps {
  notifications: AppNotification[]
}

const NotificationMenu: React.FC<NotificationProps> = ({ notifications }) => {
  return (
    <div>
      {notifications.map(notification => (
        <div key={notification.id} className='notification-item'>
          <div className='text-lg'>
            <Menubar className='p-0 bg-transparent outline-none shadow-none space-0 border-none'>
              <MenubarMenu>
                <MenubarTrigger className='py-1.5 px-1 hover:cursor-pointer hover:text-cardBackgroundColor hover:bg-cardTextColor'>
                  <PiBellSimpleLight />
                </MenubarTrigger>
                <MenubarContent className='w-[11rem]'>
                  <MenubarItem className='rounded-sm w-full flex items-center'>
                    <MenubarShortcut className='text-[12px] w-5 notification-icon-green'>
                      <FaCalendarCheck />
                    </MenubarShortcut>
                    <span className='flex-grow text-left'>{notification.message}</span>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className='rounded-sm w-full flex items-center'>
                    <MenubarShortcut className='text-[12px] w-5'>
                      <MdMarkEmailRead />
                    </MenubarShortcut>
                    <span className='flex-grow text-left'>Mark all as read</span>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationMenu
