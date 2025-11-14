export type Question = {
  id: string
  name: string
  category: string
  hint: string
  level: string
}

export type ResponseQuestions = {
  data: Question[]
  status: number
}
