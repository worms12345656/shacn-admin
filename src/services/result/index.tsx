import { host } from '@/lib/utils'
import { ResponseResult, Result } from './type'
import { Interview } from './schema'

export const getResults = async () => {
  const result = await fetch(host(`/results`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return {
    data: await result.json(),
    status: result.status,
  }
}

export const getResultDetail = async (
  id: string | undefined
): Promise<ResponseResult> => {
  const result = await fetch(host(`/results/${id}`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await result.json()
}

export const saveResult = async ({ input }: { input: Interview }) => {
  const result = await fetch(host('/results/save'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return {
    data: await result.json(),
    status: result.status,
  }
}
export const deleteQuestion = async () => {}
