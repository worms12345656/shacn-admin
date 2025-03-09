import { host } from '@/lib/utils'

export const getQuestionList = async () => {
  const result = await fetch(host(`/questions-list`), {
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
  const result = await fetch(host(`/questions-list/unchosen`), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await result.json()
}

export const postQuestionListOnchoose = async (id: string) => {
  const result = await fetch(host(`/questions-list/onchoose`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
  return result
}

// export const saveQuestions = async ({ input }: { input: Question }) => {
//   const result = await fetch(host(`/questions/add`), {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(input),
//   })
//   return {
//     data: await result.json(),
//     status: result.status,
//   }
// }
export const deleteQuestion = async () => {}
