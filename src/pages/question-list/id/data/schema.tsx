import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const questionSchema = z.object({
  name: z.string(),
  category: z.string(),
  level: z.string(),
  hint: z.string(),
})

export type Question = z.infer<typeof questionSchema>
