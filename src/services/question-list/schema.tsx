import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const questionListSchema = z.object({
  name: z.string(),
  questionNumber: z.number(),
  level: z.string(),
  list: z.array(
    z.object({
      categoryName: z.string(),
      questionList: z.array(
        z.object({
          questionId: z.string(),
          questionName: z.string(),
          hint: z.string(),
        })
      ),
    })
  ),
})

export type QuestionList = z.infer<typeof questionListSchema>
