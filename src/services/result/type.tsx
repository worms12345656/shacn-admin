export type questionResult = {
  id: string
  name: string
  category: string
  hint: string
  rating: number
  summary: string
}

export type Result = {
  candidateName: string
  isPass: boolean
  note: string
  resultList: questionResult[]
}

export type ResponseResults = {
  data: Result[]
  status: number
}

export type ResponseResult = {
  data: Result
  status: number
}
