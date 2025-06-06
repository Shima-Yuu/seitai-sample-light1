/**
 * カラーテーマ設定
 * HSLフォーマットで色を定義
 * 形式: [色相(0-360), 彩度(0-100)%, 明度(0-100)%]
 */

// 利用可能なカラーテーマ
export const colorThemes = {
  green: {
    name: '緑',
    primary: '150 24% 49%',
    primaryForeground: '0 0% 100%',
    primaryLight: '150 24% 61%',
    primaryDark: '150 24% 39%',
    primaryHover: '150 24% 45%', // ホバー時の色（少し暗め）
    ring: '150 24% 49%',
  },
  teal: {
    name: 'ティール',
    primary: '175 60% 40%',
    primaryForeground: '0 0% 100%',
    primaryLight: '175 60% 50%',
    primaryDark: '175 60% 30%',
    primaryHover: '175 60% 36%', // ホバー時の色
    ring: '175 60% 40%',
  },
  slate: {
    name: 'スレート',
    primary: '210 20% 45%',
    primaryForeground: '0 0% 100%',
    primaryLight: '210 20% 55%',
    primaryDark: '210 20% 35%',
    primaryHover: '210 20% 40%', // ホバー時の色
    ring: '210 20% 45%',
  },
  blue: {
    name: '青',
    primary: '210 80% 60%',
    primaryForeground: '0 0% 100%',
    primaryLight: '210 80% 75%',
    primaryDark: '210 80% 45%',
    primaryHover: '210 80% 55%', // ホバー時の色
    ring: '210 80% 60%',
  },
  navy: {
    name: 'ネイビー',
    primary: '215 50% 35%',
    primaryForeground: '0 0% 100%',
    primaryLight: '215 50% 45%',
    primaryDark: '215 50% 25%',
    primaryHover: '215 50% 30%', // ホバー時の色
    ring: '215 50% 35%',
  },
  brown: {
    name: 'ブラウン',
    primary: '30 35% 45%',
    primaryForeground: '0 0% 100%',
    primaryLight: '30 35% 55%',
    primaryDark: '30 35% 35%',
    primaryHover: '30 35% 40%', // ホバー時の色
    ring: '30 35% 45%',
  },
}

// デフォルトカラーテーマ
export const defaultColorTheme = 'green'

// 現在のカラーテーマを取得
export const getCurrentTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('color-theme')
    return savedTheme && Object.keys(colorThemes).includes(savedTheme)
      ? savedTheme
      : defaultColorTheme
  }
  return defaultColorTheme
}

// カラーテーマの適用関数
export const applyColorTheme = (theme: string) => {
  if (!Object.keys(colorThemes).includes(theme)) {
    theme = defaultColorTheme
  }

  const selectedTheme = colorThemes[theme as keyof typeof colorThemes]

  if (typeof document !== 'undefined') {
    const root = document.documentElement
    root.style.setProperty('--primary', selectedTheme.primary)
    root.style.setProperty('--primary-foreground', selectedTheme.primaryForeground)
    root.style.setProperty('--primary-light', selectedTheme.primaryLight)
    root.style.setProperty('--primary-dark', selectedTheme.primaryDark)
    root.style.setProperty('--primary-hover', selectedTheme.primaryHover) // ホバー色を追加
    root.style.setProperty('--ring', selectedTheme.ring)

    localStorage.setItem('color-theme', theme)
  }
}
