import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const resultSchema = z.object({
  id: z.string(),
  name: z.string(),
  point: z.string(),
  result: z.string(),
})

export type Result = z.infer<typeof resultSchema>
