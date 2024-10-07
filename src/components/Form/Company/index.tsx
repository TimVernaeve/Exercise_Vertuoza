'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type Company, EntityType } from '@/types/graphql'
import { CompanySchema } from '@/types/zod/schema'

interface CompanyFormProps {
  onOpenChange: (isOpen: boolean) => void
  handleSubmit: (data: z.infer<typeof CompanySchema>) => void
  data?: Company
}

const CompanyForm = ({ onOpenChange, handleSubmit, data }: CompanyFormProps) => {
  const defaultValues: z.infer<typeof CompanySchema> = {
    name: data ? data.name : '',
    type: EntityType.Company,
    industry: data ? data.industry : '',
    contactEmail: data ? data.contactEmail ?? '' : ''
  }

  const form = useForm({
    resolver: zodResolver(CompanySchema),
    defaultValues
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder='name' {...field} />
              </FormControl>
              <FormDescription>
                This is your display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='industry'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry *</FormLabel>
              <FormControl>
                <Input placeholder='Industry' {...field} />
              </FormControl>
              <FormDescription>
                This is your industry.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='contactEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact email</FormLabel>
              <FormControl>
                <Input placeholder='Contact email' {...field} />
              </FormControl>
              <FormDescription>
                This is your contact email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-4'>
          <Button type='submit'>Save</Button>
          <Button variant='inactive' onClick={() => { onOpenChange(false) }} type='button'>Cancel</Button>
        </div>
      </form>
    </Form>
  )
}

export default CompanyForm
