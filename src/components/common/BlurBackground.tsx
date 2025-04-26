'use client'

import { useEffect } from 'react'
import { TrianglesMosaicBg } from '../../assets/TrianglesMosaicBg.module.js'

const BlurBackground = () => {
  useEffect(() => {
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }

    const getBrightness = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return (r * 299 + g * 587 + b * 114) / 1000
    }

    const randomColors = Array.from({ length: 6 }, () => getRandomColor())

    const sortedColors = [...randomColors].sort((a, b) => getBrightness(a) - getBrightness(b))
    const secondDarkestColor = sortedColors[1]

    // localStorage.setItem('bgColor', secondDarkestColor)

      new TrianglesMosaicBg({
          dom: 'box',
          colors: ["#4A86B4", "#265999", "#1781C2", "#0CBCEB"],
          loop: true,
        })
  }, [])

  //   useEffect(() => {
  //     new TrianglesMosaicBg({
  //         dom: 'box',
  //         colors: ["#4A86B4", "#265999", "#1781C2", "#0CBCEB"],
  //         loop: true,
  //       })
  //   }, []);

  return <div id='box' className='fixed inset-0 -z-50 w-full h-full pointer-events-none'></div>
}

export default BlurBackground
