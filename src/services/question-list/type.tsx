import { Question } from '../question/type'

export type UnchosenList = { id: string; name: string }[]

export type QuestionList = {
  id: string
  name: string
  level: string
  questionListId: string[]
  questionList: Question[]
}

export type ResponseQuestionList = {
  data: {
    id: string
    name: string
    level: string
    questionListId: string[]
    questionList: Question[]
  }
  status: number
}
