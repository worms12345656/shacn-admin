import { host } from '@/lib/utils'
import { authFetcher } from '..'
import { Interview } from './schema'
import { questionResult } from './type'

export const getResults = async () => {
  const results = await authFetcher(host(`/results`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  return results
}

export const getResultDetail = async (id: string | undefined) => {
  const result = await authFetcher(host(`/results/${id}`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  return result
}

export const saveResult = async ({ input }: { input: Interview }) => {
  const result = await authFetcher<questionResult>(host('/results/save'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(input),
  })
  return result
}
export const deleteQuestion = async () => {}
