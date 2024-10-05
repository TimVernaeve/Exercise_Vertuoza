import { z } from 'zod'

const EntitySchema = z.object({
  name: z.string().min(1)
})

export const ContactSchema = EntitySchema.extend({
  email: z.string().min(1).email(),
  phone: z.string().optional()
})

export const CompanySchema = EntitySchema.extend({
  industry: z.string().min(1),
  contactEmail: z.string().email().optional()
})
