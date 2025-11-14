import { host } from '@/lib/utils'
import { QuestionListEditForm, QuestionListForm } from './schema'
import { ResponseQuestionList } from './type'
import { useAuth } from '@/components/session-provider'
import { ErrorResponse, Navigate } from 'react-router-dom'
import { authFetcher } from '..'

export const getQuestionList = async () => {
  const result = await fetch(host(`/question-list`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', credentials: 'include' },
  })
  return await result.json()
}

export const getQuestionListById = async (
  id: string | undefined
): Promise<ResponseQuestionList> => {
  try {
    const result = await fetch(host(`/question-list/${id}`), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', credentials: 'include' },
    })
    return await result.json()
  } catch (e) {
    throw new Response('Not Found', { status: 404 })
  }
}

export const getInterview = async () => {
  const result = await authFetcher(host(`/interview`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  return result
}

export const getQuestionListUnchosen = async () => {
  const result = await fetch(host(`/question-list/unchosen`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', credentials: 'include' },
  })
  return await result.json()
}

export const postQuestionListOnChoose = async (id: string) => {
  const result = await fetch(host(`/question-list/onchoose`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', credentials: 'include' },
    body: JSON.stringify({ id }),
  })
  return result
}

export const saveQuestionList = async ({
  input,
}: {
  input: QuestionListForm
}) => {
  const result = await fetch(host(`/question-list/create`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return {
    data: await result.json(),
    status: result.status,
  }
}

export const updateQuestionList = async ({
  id,
  input,
}: {
  id: string | undefined
  input: QuestionListEditForm
}) => {
  const result = await fetch(host(`/question-list/${id}/update`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return {
    status: result.status,
  }
}
export const deleteQuestion = async () => {}
