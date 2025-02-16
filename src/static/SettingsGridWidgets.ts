import { RiBuilding2Fill, RiListSettingsFill } from '@remixicon/react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { HiReceiptRefund } from 'react-icons/hi2'
import { MdOutlineWeb } from 'react-icons/md'
import { PiCalendarDotFill, PiCalendarStarFill, PiDoorFill, PiSubtitlesFill, PiTimerFill } from 'react-icons/pi'

export const widgets = [
  {
    title: 'Configurations',
    icon: RiListSettingsFill,
    iconFill: '#4682B4',
    bgColor: '#d6dde2',
    path: '/settings/configurations',
  },
  {
    title: 'Email Templates',
    icon: MdOutlineWeb,
    iconFill: '#8c46b4',
    bgColor: '#e0d6e2',
    path: '/settings/email-templates',
  },
  {
    title: 'Departments',
    icon: RiBuilding2Fill,
    iconFill: '#46b488',
    bgColor: '#d6e2d9',
    path: '/settings/departments',
  },
  {
    title: 'Holidays',
    icon: PiCalendarStarFill,
    iconFill: '#b46046',
    bgColor: '#e2dad6',
    path: '/settings/holidays',
  },
  {
    title: 'Job Titles',
    icon: PiSubtitlesFill,
    iconFill: '#6451a9',
    bgColor: '#d6d7e2',
    path: '/settings/job-titles',
  },
  {
    title: 'Leave Type',
    icon: PiCalendarDotFill,
    iconFill: '#8f6138',
    bgColor: '#e2e2d6',
    path: '/settings/leave-types',
  },
  {
    title: 'Locations',
    icon: FaMapLocationDot,
    iconFill: '#3e9a98',
    bgColor: '#d6e0e2',
    path: '/settings/locations',
  },
  {
    title: 'Meeting Rooms',
    icon: PiDoorFill,
    iconFill: '#cfb002',
    bgColor: '#F1EBD0',
    path: '/settings/meeting-rooms',
  },
  {
    title: 'Reimbursement Types',
    icon: HiReceiptRefund,
    iconFill: '#556B2F',
    bgColor: '#dce2d6',
    path: '/settings/reimbursement-types',
  },
  {
    title: 'Work Shifts',
    icon: PiTimerFill,
    iconFill: '#DC143C',
    bgColor: '#e2d6d6',
    path: '/settings/work-shifts',
  },
]
