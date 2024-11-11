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
