'use client'
import { RemixiconComponentType } from '@remixicon/react'
import Link from 'next/link'
import { FC, useState } from 'react'
import { IconType } from 'react-icons/lib'

interface WidgetProps {
  title: string
  Icon: IconType | RemixiconComponentType
  iconFill: string
  bgColor: string
  redirectRoute: string
}

const WidgetCard: FC<WidgetProps> = ({ title, Icon, iconFill, bgColor, redirectRoute }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      className='w-full h-full rounded-md shadow-sm overflow-hidden hover:cursor-pointer hover:shadow-md hover:scale-105 transition-transform bg-[#FFFFFF] dark:bg-[#35383A]'
      style={{ background: isHovered ? bgColor : undefined }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href={redirectRoute}
    >
      <div className='w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]'>
        <div className={`rounded-full p-2 sm:p-1 md:p-1.5 lg:p-3 xl:p-4`} style={{ background: bgColor }}>
          <Icon style={{ height: 24, width: 24, fill: iconFill }} />
        </div>
        <div
          className={`pl-6 text-2xl md:text-xs lg:text-lg xl:text-sm ${
            isHovered ? 'text-slate-600 font-medium' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {title}
        </div>
      </div>
    </Link>
  )
}

export default WidgetCard
