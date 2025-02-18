import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const questionSchema = z.object({
  name: z.string().min(1),
  category: z.string(),
  level: z.string(),
  hint: z.string().min(1),
})

export type Question = z.infer<typeof questionSchema>
