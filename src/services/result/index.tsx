import { host } from '@/lib/utils'

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

// export const saveQuestion = async ({ input }: { input: Question }) => {
//   const result = await fetch(host(`/questions/create`), {
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
