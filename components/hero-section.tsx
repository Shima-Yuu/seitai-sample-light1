'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { strengthsSummary } from '@/lib/data/strengths'

const heroImages = [
  '/images/img_slider-01.png',
  '/images/img_slider-02.png',
  '/images/img_slider-03.png',
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [strengthIndex, setStrengthIndex] = useState(0)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const animationRef = useRef<NodeJS.Timeout | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  // 最初のレンダリング時にアニメーションが確実に実行されるようにする
  useEffect(() => {
    // マウント時にはアニメーションを開始する準備をする
    if (isFirstRender) {
      // すぐにマウント状態を更新してアニメーションを有効にする
      setTimeout(() => {
        setIsFirstRender(false)
      }, 100)
    }
  }, [isFirstRender])

  // 画像切り替えの処理
  useEffect(() => {
    // 前回のタイマーをクリアする（必要な場合）
    if (animationRef.current) {
      clearInterval(animationRef.current)
    }

    // 新しいタイマーをセットする
    animationRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % heroImages.length)
    }, 5000)

    // クリーンアップ時にタイマーを解除
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [])

  const nextStrength = () => {
    setStrengthIndex(prevIndex => (prevIndex + 1) % strengthsSummary.length)
  }

  const prevStrength = () => {
    setStrengthIndex(prevIndex => (prevIndex === 0 ? strengthsSummary.length - 1 : prevIndex - 1))
  }

  // スライダーのトランスフォーム位置を調整
  useEffect(() => {
    if (sliderRef.current) {
      const translateX = `translateX(-${strengthIndex * (100 / strengthsSummary.length)}%)`
      sliderRef.current.style.transform = translateX
    }
  }, [strengthIndex])

  return (
    <section className="relative pt-20 pb-10 md:pt-40 md:pb-24 lg:pt-36 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-background -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 -z-10" />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left md:text-center lg:text-left"
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-relaxed lg:leading-[1.3]">
              身体のことで悩まないような
              <br className="hidden sm:inline" />
              人生をおくってもらいたい。
            </h1>

            <p className="text-sm md:text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
              痛みを少しでも取り除いて、より豊かな人生を送ってもらえるように。
            </p>

            {/* モバイル表示用スライダー（修正版） */}
            <div className="md:hidden mb-6 relative px-10">
              <div className="overflow-hidden">
                <div
                  ref={sliderRef}
                  className="flex transition-all duration-300 ease-in-out"
                  style={{
                    width: `${strengthsSummary.length * 100}%`,
                  }}
                >
                  {strengthsSummary.map((item, idx) => (
                    <div
                      key={idx}
                      className="w-full px-1.5 flex-shrink-0"
                      style={{ width: `${100 / strengthsSummary.length}%` }}
                    >
                      <div
                        className={`transition-all duration-300 rounded-lg p-5 border border-primary/10 bg-card/80 backdrop-blur-sm shadow-sm ${
                          idx === strengthIndex ? 'opacity-100 scale-100' : 'opacity-60 scale-90'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center mb-3">
                          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            {item.icon}
                          </div>
                          <h3
                            className="text-base font-semibold mb-2"
                            dangerouslySetInnerHTML={{ __html: item.title }}
                          />
                        </div>
                        <p
                          className="text-sm text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prevStrength}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary z-10"
                aria-label="前の特徴"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextStrength}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary z-10"
                aria-label="次の特徴"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* PC表示用グリッド */}
            <div className="hidden md:block overflow-visible">
              <div className="grid grid-cols-3 gap-4 mb-8">
                {strengthsSummary.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
                    className="bg-card/80 backdrop-blur-sm shadow-sm rounded-lg p-4 border border-primary/10"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-3">{item.icon}</div>
                      <h3
                        className="text-base font-semibold"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    </div>
                    <p
                      className="text-xs text-muted-foreground mt-2"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-start md:mt-0 mt-[30px] md:mx-0 mx-auto">
              <Button asChild size="lg" className="text-sm md:text-base">
                <Link href="#contact">初回限定 20%オフ キャンペーン実施中</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl bg-white">
              <AnimatePresence initial={false} mode="sync">
                {heroImages.map(
                  (image, index) =>
                    currentIndex === index && (
                      <motion.div
                        key={`${image}-${isFirstRender ? 'initial' : 'normal'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          opacity: { duration: 1.5, ease: 'easeInOut' },
                        }}
                        className="absolute inset-0"
                        style={{ zIndex: currentIndex === index ? 1 : 0 }}
                      >
                        <motion.div
                          initial={{ scale: 1 }}
                          animate={{ scale: 1.1 }}
                          transition={{
                            scale: { duration: 5, ease: 'easeInOut' },
                          }}
                          className="w-full h-full"
                        >
                          <Image
                            src={image}
                            alt={`施術の様子 ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={index === 0}
                          />
                        </motion.div>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
