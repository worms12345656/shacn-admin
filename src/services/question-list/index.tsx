import { host } from '@/lib/utils'
import { authFetcher } from '..'
import { QuestionListEditForm, QuestionListForm } from './schema'

export const getQuestionList = async () => {
  const result = await authFetcher(host(`/question-list`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  return result
}

export const getQuestionListById = async (id: string | undefined) => {
  try {
    const questionList = await authFetcher(host(`/question-list/${id}`), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    return questionList
  } catch (e) {
    throw new Response('Not Found', { status: 404 })
  }
}

export const getInterview = async () => {
  const interview = await authFetcher(host(`/interview`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  return interview
}

export const getQuestionListUnchosen = async () => {
  const result = await authFetcher(host(`/question-list/unchosen`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  return result
}

export const postQuestionListOnChoose = async (id: string) => {
  const result = await authFetcher(host(`/question-list/onchoose`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ id }),
  })
  return result
}

export const saveQuestionList = async ({
  input,
}: {
  input: QuestionListForm
}) => {
  const result = await authFetcher(host(`/question-list/create`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(input),
  })
  return result
}

export const updateQuestionList = async ({
  id,
  input,
}: {
  id: string | undefined
  input: QuestionListEditForm
}) => {
  const result = await authFetcher(host(`/question-list/${id}/update`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(input),
  })
  return result
}

export const copyQuestionList = async (id: string) => {
  const result = await authFetcher(host(`/question-list/${id}/copy`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
  return result
}

export const deleteQuestion = async () => {}
