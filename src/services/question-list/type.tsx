import { Question } from '../question/type'

export type UnchosenList = { id: string; name: string }[]

export type QuestionList = {
  id: string
  name: string
  level: string
  questionListId: string[]
  questionList: Question[]
}

export type Interview = {
  id: string
  name: string
  questionList: Question[]
  unchosenList: {
    id: string
    name: string
  }[]
}
