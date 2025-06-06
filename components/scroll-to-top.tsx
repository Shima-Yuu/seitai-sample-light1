'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // スクロール位置に基づいて表示・非表示を切り替える
  useEffect(() => {
    const toggleVisibility = () => {
      // 200px以上スクロールしたら表示
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // トップにスクロールする関数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'fixed bottom-5 md:bottom-10 right-5 md:right-10 z-50 rounded-full h-10 w-10 shadow-md border border-border bg-background transition duration-300 ease-in-out hover:bg-primary-hover hover:text-white',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={scrollToTop}
      aria-label="ページトップへ戻る"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  )
}
