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
import { type Contact, EntityType } from '@/types/graphql'
import { ContactSchema } from '@/types/zod/schema'

interface ContactFormProps {
  onOpenChange: (isOpen: boolean) => void
  handleSubmit: (data: z.infer<typeof ContactSchema>) => void
  data?: Contact
}

const ContactForm = ({ onOpenChange, handleSubmit, data }: ContactFormProps) => {
  const defaultValues: z.infer<typeof ContactSchema> = {
    name: data ? data.name : '',
    type: EntityType.Contact,
    email: data ? data.email : '',
    phone: data ? data.phone ?? '' : ''
  }

  const form = useForm({
    resolver: zodResolver(ContactSchema),
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
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormDescription>
                This is your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>'Phone'</FormLabel>
              <FormControl>
                <Input placeholder='Phone' {...field} />
              </FormControl>
              <FormDescription>
                This is your 'phone number'.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-4'>
          <Button type='submit'>Create</Button>
          <Button variant='inactive' onClick={() => { onOpenChange(false) }} type='button'>Cancel</Button>
        </div>
      </form>
    </Form>
  )
}

export default ContactForm
