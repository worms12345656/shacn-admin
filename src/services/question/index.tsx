import { host } from '@/lib/utils'
import { Question } from './schema'
import { ResponseQuestions } from './type'

export const getQuestions = async (): Promise<ResponseQuestions> => {
  const result = await fetch(host(`/questions`))
  return await result.json()
}

export const showsQuestions = async () => {}

export const saveQuestion = async ({ input }: { input: Question }) => {
  const result = await fetch(host(`/questions/create`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return await result.json()
}

export const deleteQuestion = async () => {}
