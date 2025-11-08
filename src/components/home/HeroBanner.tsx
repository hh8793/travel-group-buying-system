'use client'

import { Carousel } from 'antd'
import { useRouter } from 'next/navigation'
import { Banner } from '@/types'

interface HeroBannerProps {
  banners: Banner[]
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const router = useRouter()

  const handleBannerClick = (banner: Banner) => {
    if (banner.link) {
      router.push(banner.link)
    }
  }

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
      <Carousel
        autoplay
        autoplaySpeed={5000}
        speed={1000}
        dots={{
          className: 'bottom-6'
        }}
        className="h-full"
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative h-96 md:h-[500px] cursor-pointer group"
            onClick={() => handleBannerClick(banner)}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-start">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-2xl text-white">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {banner.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6 opacity-90">
                    立即参与拼团，享受超值优惠价格
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300">
                    立即抢购
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      
      {/* 装饰性渐变背景 */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
    </div>
  )
}