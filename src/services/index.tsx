import { HttpResponse } from '@/lib/api'

export function transformResponse<T>() {
  // throwErr: boolean
  return async (res: Response): Promise<HttpResponse<T>> => {
    const json = await res.json().catch(() => {
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
  init?: RequestInit
  // throwErr = false
) {
  return await fetch(input, init)
    .then(transformResponse<T>())
    .catch((err) => {
      throw err
    })
}
