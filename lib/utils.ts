import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
}

export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}
