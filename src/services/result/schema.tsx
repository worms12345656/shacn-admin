import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const resultSchema = z.object({
  id: z.string(),
  candidateName: z.string().min(1, 'Name must not be empty!'),
  note: z.string(),
  isPass: z.boolean(),
  category: z.array(
    z.array(
      z.object({
        questionId: z.string(),
        summary: z.string(),
        rating: z.number(),
      })
    )
  ),
})

export type Result = z.infer<typeof resultSchema>

export type Category = {
  categoryName: string
  questionList: {
    questionId: string
    questionName: string
    hint: string
    rating: number
    summary: string
  }[]
}

export const interviewSchema = z.object({
  candidateName: z.string().min(1, 'Name must not be empty!'),
  note: z.string(),
  isPass: z.boolean(),
  questionList: z.array(
    z.object({
      questionId: z.string(),
      summary: z.string(),
      rating: z.number(),
    })
  ),
})

export type Interview = z.infer<typeof interviewSchema>

export const resultsSchema = z.object({
  id: z.string(),
  candidateName: z.string(),
  point: z.number(),
  result: z.string(),
})

export type Results = z.infer<typeof resultsSchema>
