import { z } from 'zod'
import { questionSchema } from '../question/schema'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const questionListSchema = z.object({
  name: z.string(),
  questionNumber: z.number(),
  level: z.string(),
  questionList: z.array(questionSchema),
})

export type QuestionList = z.infer<typeof questionListSchema>
