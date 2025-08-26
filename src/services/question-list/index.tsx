import { host } from '@/lib/utils'
import { QuestionListForm } from './schema'

export const getQuestionList = async () => {
  const result = await fetch(host(`/question-list`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await result.json()
}

export const getInterview = async () => {
  const result = await fetch(host(`/interview`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await result.json()
}

export const getQuestionListUnchosen = async () => {
  const result = await fetch(host(`/question-list/unchosen`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await result.json()
}

export const postQuestionListOnChoose = async (id: string) => {
  const result = await fetch(host(`/question-list/onchoose`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
export const deleteQuestion = async () => {}
