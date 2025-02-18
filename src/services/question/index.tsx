import { host } from '@/lib/utils'
import { Question } from './schema'

export const showsQuestions = async () => {}
export const saveQuestions = async ({ input }: { input: Question }) => {
  const result = await fetch(host(`/questions/add`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return await result.json()
}
export const deleteQuestion = async () => {}
