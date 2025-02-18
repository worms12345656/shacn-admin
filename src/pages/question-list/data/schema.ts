import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const questionListSchema = z.object({
  id: z.string(),
  name: z.string(),
  questionNumber: z.number(),
  level: z.string(),
  choosen: z.string(),
})

export type QuestionList = z.infer<typeof questionListSchema>
