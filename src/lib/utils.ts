import { Question } from '@/pages/questions/data/schema'
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

export function arrayToObject<T>(arr: T[]): { [key: number]: T } {
  return arr.reduce(
    (obj, item, index) => {
      obj[index] = item
      return obj
    },
    {} as { [key: number]: T }
  )
}

// Convert questionList to row selection
export function questionListToRowSelection<T>(
  arr: T[],
  data: Question[]
): { [key: number]: boolean } {
  return arr.reduce(
    (obj, item) => {
      // find index of question in list
      const index = data.findIndex((data) => data.id === item)
      // assign value in row selection
      obj[index] = true
      return obj
    },
    {} as { [key: number]: boolean }
  )
}
