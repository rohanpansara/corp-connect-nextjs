import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import ThemeToggle from '@/hooks/uiHooks/ThemeToggle'
import { FaCalendarCheck, FaCalendarTimes, FaPeopleCarry } from 'react-icons/fa'
import { FaCircleUser } from 'react-icons/fa6'
import { IoPeople } from 'react-icons/io5'
import { MdContactSupport, MdMarkEmailRead } from 'react-icons/md'
import { PiBellSimpleLight, PiUserCircleLight } from 'react-icons/pi'

export function AppNavbar() {
  return (
    <div className='sticky top-0 flex justify-center items-center w-full max-w-auto h-[30px] p-2 pt-0 pb-0 bg-mainBackground space-y-4 z-[500]'>
      <div className='flex items-center w-full'>
        <div className='flex justify-evenly items-center ml-auto gap-2'>
          {/* Notification Menu */}
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
                    <span className='flex-grow text-left'>Leave Approved!</span>
                  </MenubarItem>
                  <MenubarItem className='rounded-sm w-full flex items-center'>
                    <MenubarShortcut className='text-[12px] w-5 notification-icon-general'>
                      <IoPeople />
                    </MenubarShortcut>
                    <span className='flex-grow text-left'>Meeting Invite</span>
                  </MenubarItem>
                  <MenubarItem className='rounded-sm w-full flex items-center'>
                    <MenubarShortcut className='text-[12px] w-5 notification-icon-red'>
                      <FaCalendarTimes />
                    </MenubarShortcut>
                    <span className='flex-grow text-left'>Leave Rejected!</span>
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

          {/* Profile Menu */}
          <div className='text-lg'>
            <Menubar className='p-0 bg-transparent outline-none shadow-none space-0 border-none'>
              <MenubarMenu>
                <MenubarTrigger className='py-1.5 px-1 hover:cursor-pointer hover:text-cardBackgroundColor hover:bg-cardTextColor'>
                  <PiUserCircleLight />
                </MenubarTrigger>
                <MenubarContent className='w-[11rem]'>
                  <MenubarItem className='rounded-sm w-full flex items-center'>
                    <MenubarShortcut className='text-[12px] w-5'>
                      <FaCircleUser />
                    </MenubarShortcut>
                    <span className='flex-grow text-left'>My Profile</span>
                  </MenubarItem>
                  <MenubarItem className='rounded-sm w-full flex items-center'>
                    <MenubarShortcut className='text-[12px] w-5'>
                      <FaPeopleCarry />
                    </MenubarShortcut>
                    <span className='flex-grow text-left'>Contact HR</span>
                  </MenubarItem>
                  <MenubarItem className='rounded-sm w-full flex items-center'>
                    <MenubarShortcut className='text-[12px] w-5'>
                      <MdContactSupport />
                    </MenubarShortcut>
                    <span className='flex-grow text-left'>Raise IT Ticket</span>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <div className='text-lg'>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  )
}
