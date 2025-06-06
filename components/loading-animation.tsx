'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config/site'

export function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // スクロールを無効化
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    }

    // ページ読み込み完了後、少し遅延させてローディングを終了
    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = 'auto' // スクロールを有効化
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'auto' // コンポーネントがアンマウントされた場合もスクロールを有効化
    }
  }, [isLoading])

  // ローディングが終了したらnullを返す
  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center">
        <div className="relative">
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-primary/30"
            initial={{ opacity: 1 }}
          />
          <motion.div
            className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 rounded-full border-t-4 border-r-4 border-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full border-t-4 border-l-4 border-accent"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          />
        </div>
        <motion.div
          className="mt-6 text-primary font-bold text-base md:text-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse' }}
        >
          <span>{siteConfig.name}</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
