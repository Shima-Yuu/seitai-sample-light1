"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return { ref, isInView }
}
