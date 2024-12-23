import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const API_BASE_URL = 'http://localhost:8000/api'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function host(url: string) {
  return API_BASE_URL + url
}

export type HTTPResponse<T> = {
  status: string
  data: T
}

export function formatToMillionUSD(number: any) {
  if (number >= 1_000_000) {
    // Chia số cho 1 triệu và làm tròn đến 2 chữ số thập phân
    const millions = (number / 1_000_000).toFixed(2)
    return `$${millions}M`
  }
  // Nếu số nhỏ hơn 1 triệu, trả về giá trị ban đầu (có thể format thêm tùy nhu cầu)
  return `$${number}`
}
