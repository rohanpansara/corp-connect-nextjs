// components/Loader.tsx
import React from 'react'

interface LoaderProps {
  color?: 'lightBlue' | 'blue' | 'red' | 'green' | 'yellow' | 'purple'
}

const colorMap: Record<string, string> = {
  lightBlue: 'border-blue-200',
  blue: 'border-blue-500',
  red: 'border-red-500',
  green: 'border-green-500',
  yellow: 'border-yellow-500',
  purple: 'border-purple-500',
}

const Loader: React.FC<LoaderProps> = ({ color = 'blue' }) => {
  const borderColorClass = colorMap[color] || colorMap.blue

  return (
    <div className='flex items-center justify-center h-[calc(100vh-30px)]'>
      <div
        className={`w-8 h-8 border-4 ${borderColorClass} rounded-full border-t-transparent animate-spin`}
      ></div>
    </div>
  )
}

export default Loader
