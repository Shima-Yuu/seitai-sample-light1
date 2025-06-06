import type React from 'react'
import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'
import { StructuredData } from './structured-data'
import { siteConfig } from '@/lib/config/site'
import { ScrollToTop } from '@/components/scroll-to-top'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
})

export const metadata: Metadata = {
  title: siteConfig.title.default,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
}

// カラーテーマ初期化スクリプト
function ColorThemeInitializer() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var savedTheme = localStorage.getItem('color-theme');
              var themes = ${JSON.stringify(
                Object.keys(require('@/lib/config/colors').colorThemes)
              )};
              
              if (savedTheme && themes.includes(savedTheme)) {
                var theme = ${JSON.stringify(
                  require('@/lib/config/colors').colorThemes
                )}[savedTheme];
                var root = document.documentElement;
                
                root.style.setProperty('--primary', theme.primary);
                root.style.setProperty('--primary-foreground', theme.primaryForeground);
                root.style.setProperty('--primary-light', theme.primaryLight);
                root.style.setProperty('--primary-dark', theme.primaryDark);
                root.style.setProperty('--ring', theme.ring);
              }
            } catch (e) {
              console.error('カラーテーマの初期化中にエラーが発生しました:', e);
            }
          })();
        `,
      }}
    />
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <ColorThemeInitializer />
      </head>
      <body className={notoSansJP.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ScrollToTop />
          <Toaster />
        </ThemeProvider>
        <StructuredData />
      </body>
    </html>
  )
}
