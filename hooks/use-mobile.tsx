import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

// 任意のメディアクエリに対応したフック
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(false)

  React.useEffect(() => {
    // サーバーサイドレンダリング時は実行しない
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    const updateMatch = () => {
      setMatches(media.matches)
    }

    // 初期値をセット
    updateMatch()

    // イベントリスナーを登録
    media.addEventListener('change', updateMatch)

    // クリーンアップ関数
    return () => media.removeEventListener('change', updateMatch)
  }, [query])

  return matches
}
