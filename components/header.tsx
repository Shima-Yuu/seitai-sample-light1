'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/lib/config/site'
import { ColorThemeToggle } from './color-theme-toggle'
import { useMediaQuery } from '@/hooks/use-mobile'

const navItems = [
  { name: '症状別のお悩み', href: '#symptoms' },
  { name: '当院の強み', href: '#strengths' },
  { name: '施術メニュー・料金表', href: '#services' },
  { name: '施術の流れ', href: '#process' },
  { name: 'アクセス・営業時間', href: '#access' },
  { name: 'よくある質問', href: '#faq' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    // ローディングアニメーションの表示時間と同じにする
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      // ローディング完了後にフェードインアニメーションを開始
      setTimeout(() => {
        setIsVisible(true)
      }, 100)
    }, 1600)

    return () => clearTimeout(loadingTimer)
  }, [])

  // SP表示時のみオフセット付きでスクロールする関数
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isMobile) return // PCの場合は標準の動作を使用

    e.preventDefault()
    setIsOpen(false)

    // ハンバーガーメニューを閉じてからスクロールする
    setTimeout(() => {
      const targetId = href.replace('#', '')
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const headerHeight = 56 // ヘッダーの高さ（おおよその値）
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        })
      }
    }, 100) // メニューのアニメーション完了を少し待つ
  }

  // ローディング中は非表示
  if (isLoading) return null

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-background/95 backdrop-blur-sm shadow-md py-2'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold text-primary">
          {siteConfig.name}
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ColorThemeToggle />
          <Button asChild>
            <Link href="#contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              ご予約・お問い合わせ
            </Link>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ColorThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
            className="p-3"
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0, borderTopWidth: 0 }}
            animate={{
              height: 'auto',
              borderTopWidth: 1,
              transition: {
                height: { duration: 0.3 },
                borderTopWidth: { duration: 0.1 },
              },
            }}
            exit={{
              height: 0,
              borderTopWidth: 0,
              transition: {
                height: { duration: 0.3 },
                borderTopWidth: { duration: 0.01 }, // ボーダーをすぐに消す
              },
            }}
            className="md:hidden bg-background border-t border-solid border-border overflow-hidden"
            style={{ borderTopWidth: 0 }} // 初期状態は0
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.2, delay: 0.1 },
                exit: { duration: 0.2, delay: 0 },
              }}
              className="container py-5 flex flex-col space-y-4"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: 0.05 * i,
                    duration: 0.2,
                  }}
                >
                  <Link
                    href={item.href}
                    className="text-sm font-medium py-2 block hover:text-primary transition-colors"
                    onClick={e => scrollToSection(e, item.href)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: 0.05 * (navItems.length + 1),
                  duration: 0.2,
                }}
                className="w-full mt-4"
              >
                <Button asChild className="w-full">
                  <Link href="#contact" onClick={e => scrollToSection(e, '#contact')}>
                    <Phone className="h-4 w-4 mr-2" />
                    ご予約・お問い合わせ
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
