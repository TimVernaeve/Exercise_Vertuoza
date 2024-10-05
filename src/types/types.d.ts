import { type EntityType } from '@/types/graphql'

interface ContactFormData {
  entityType: EntityType.Contact
  name: string
  email: string
  phone?: string
}

interface CompanyFormData {
  entityType: EntityType.Company
  name: string
  industry: string
  contactEmail?: string
}

export type ValueData = ContactFormData | CompanyFormData
