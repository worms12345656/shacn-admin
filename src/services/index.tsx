import { HttpResponse } from '@/lib/api'
import { host } from '@/lib/utils'

export function transformResponse<T>(throwErr: boolean) {
  return async (res: Response): Promise<HttpResponse<T>> => {
    const json = await res.json().catch((e) => {
      return {}
    })
    if (!res.ok) {
      const err: Error = { ...json, status: res.status }
      const response = { data: null, err, status: res.status }
      throw response
    }
    return { data: json, err: null, status: res.status }
  }
}

export async function authFetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
  throwErr = false
) {
  return await fetch(input, init)
    .then(transformResponse<T>(throwErr))
    .catch((err) => {
      throw err
    })
}
