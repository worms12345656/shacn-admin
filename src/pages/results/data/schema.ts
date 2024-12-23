import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const resultSchema = z.object({
  id: z.string(),
  candidateName: z.string(),
  point: z.number(),
  result: z.string(),
})

export type Result = z.infer<typeof resultSchema>
