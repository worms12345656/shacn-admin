import { host } from '@/lib/utils'
import { authFetcher } from '..'
import { Question } from './schema'

export const getQuestions = async () => {
  const result = await authFetcher(host(`/questions`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  return result
}

export const getQuestionById = async (id: string | undefined) => {
  if (!id) {
    throw new Error('Question ID is required')
  }
  const result = await authFetcher(host(`/questions/${id}`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  return result
}

export const showsQuestions = async () => {}

export const saveQuestion = async ({ input }: { input: Question }) => {
  const result = await authFetcher<Question>(host(`/questions/create`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(input),
  })
  return result
}

export const updateQuestion = async ({ input }: { input: Question }) => {
  const result = await authFetcher<Question>(
    host(`/questions/${input.id}/update`),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(input),
    }
  )
  return result
}

export const deleteQuestion = async (id: string) => {
  if (!id) {
    throw new Error('Question ID is required')
  }
  const result = await authFetcher(host(`/questions/${id}/delete`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  return result
}

export const copyQuestion = async (id: string) => {
  if (!id) {
    throw new Error('Question ID is required')
  }
  const result = await authFetcher<Question>(host(`/questions/${id}/copy`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  return result
}
