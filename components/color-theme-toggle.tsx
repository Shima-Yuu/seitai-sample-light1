'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { colorThemes, defaultColorTheme, applyColorTheme } from '@/lib/config/colors'
import { Paintbrush } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function ColorThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<string>(defaultColorTheme)
  const [mounted, setMounted] = useState(false)

  // クライアントサイドでのみ実行
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('color-theme')
    if (savedTheme && Object.keys(colorThemes).includes(savedTheme)) {
      setCurrentTheme(savedTheme)
      applyColorTheme(savedTheme)
    } else {
      applyColorTheme(defaultColorTheme)
    }
  }, [])

  // サーバーサイドレンダリング時は何も表示しない
  if (!mounted) {
    return null
  }

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    applyColorTheme(theme)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md border-border"
          aria-label="カラーテーマを変更"
        >
          <Paintbrush className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2">
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(colorThemes).map(([key, theme]) => (
            <Button
              key={key}
              variant="ghost"
              className="h-6 w-6 rounded-md p-0 overflow-hidden"
              style={{ backgroundColor: `hsl(${theme.primary})` }}
              onClick={() => handleThemeChange(key)}
              aria-label={`${theme.name}テーマに変更`}
              title={theme.name}
            >
              {currentTheme === key && (
                <div className="w-full h-full flex items-center justify-center bg-black/10">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
