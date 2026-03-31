import { DataResponse, HttpResponse } from '@/lib/api'
import { useLoaderData } from 'react-router-dom'

export function useArrayLoaderData<T = unknown>(): T[] {
  const data = useLoaderData() as HttpResponse<T[]>
  return data.data || []
}

export function useData<T = unknown>(): T {
  const data = useLoaderData() as DataResponse<T>
  return data.data
}
