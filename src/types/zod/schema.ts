import { z } from 'zod'

import { EntityType } from '../graphql'

const EntitySchema = z.object({
  name: z.string().min(1)
})

export const ContactSchema = EntitySchema.extend({
  type: z.literal(EntityType.Contact),
  email: z.string().email(),
  phone: z.string().optional()
})

export const CompanySchema = EntitySchema.extend({
  type: z.literal(EntityType.Company),
  industry: z.string().min(1),
  contactEmail: z.string().email().optional().or(z.literal(''))
})
