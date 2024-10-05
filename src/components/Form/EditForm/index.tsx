/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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
import { useToast } from '@/hooks/use-toast'
import { type Company, type Contact, EntityType, useUpdateEntityMutation } from '@/types/graphql'
import { type ValueData } from '@/types/types'
import { ContactSchema, CompanySchema } from '@/types/zod/editSchema'

const getFormSchema = (type: EntityType) => {
  return type === EntityType.Contact ? ContactSchema : CompanySchema
}

type FormData = z.infer<ReturnType<typeof getFormSchema>>

interface EditFormProps {
  onOpenChange: (isOpen: boolean) => void
  data: Company | Contact
}

const EditForm = ({ onOpenChange, data }: EditFormProps) => {
  const { toast } = useToast()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [entityType, setEntityType] = useState<EntityType>(data.__typename === 'Contact' ? EntityType.Contact : EntityType.Company)
  const [updateEntity] = useUpdateEntityMutation()

  const formSchema = getFormSchema(entityType)

  const contact = data.__typename === 'Contact' ? data : undefined
  const company = data.__typename === 'Company' ? data : undefined

  const defaultValues = {
    CONTACT: {
      entityType,
      name: data.name,
      email: contact ? contact.email : '',
      phone: contact ? contact.phone : ''
    },
    COMPANY: {
      entityType,
      name: data.name,
      industry: company ? company.industry : '',
      contactEmail: company ? company.contactEmail : ''
    }
  }

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: entityType === EntityType.Contact ? defaultValues.CONTACT : defaultValues.COMPANY
  })

  const onSubmit = async (values: FormData) => {
    try {
      const valueData = values as ValueData

      const response = await updateEntity({
        variables: {
          input: {
            id: data.id,
            entityType,
            name: valueData.name,
            ...(valueData.entityType === EntityType.Contact
              ? {
                  email: valueData.email,
                  phone: valueData.phone
                }
              : {
                  industry: valueData.industry,
                  contactEmail: valueData.contactEmail
                })
          }
        }
      })

      if (response.data) {
        onOpenChange(false)
        toast({
          title: `${entityType.toLowerCase()} updated succesfully`
        })
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message)
        return
      }
      setErrorMessage('something went wrong')
    }
  }

  const handleToggle = (type: EntityType.Contact | EntityType.Company) => {
    setEntityType(type)
    form.reset(defaultValues[type])
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='flex gap-4'>
          <Button
            variant={entityType === EntityType.Contact ? 'active' : 'inactive'}
            className='w-fit'
            type='button'
            onClick={() => { handleToggle(EntityType.Contact) }}
          >
            Contact
          </Button>
          <Button
            variant={entityType === EntityType.Company ? 'active' : 'inactive'}
            type='button'
            onClick={() => { handleToggle(EntityType.Company) }}
          >
            Company
          </Button>
        </div>
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
          name={entityType === EntityType.Contact ? 'email' : 'industry'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{entityType === EntityType.Contact ? 'Email *' : 'Industry *'}</FormLabel>
              <FormControl>
                <Input placeholder={entityType === EntityType.Contact ? 'Email' : 'Industry'} {...field} />
              </FormControl>
              <FormDescription>
                This is your {entityType === EntityType.Contact ? 'Email' : 'Industry'}.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={entityType === EntityType.Contact ? 'phone' : 'contactEmail'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{entityType === EntityType.Contact ? 'Phone' : 'Contact email'}</FormLabel>
              <FormControl>
                <Input placeholder={entityType === EntityType.Contact ? 'Phone' : 'Contact email'} {...field} />
              </FormControl>
              <FormDescription>
                This is your {entityType === EntityType.Contact ? 'phone number' : 'contact email'}.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && <span className='text-sm text-red-500'>{errorMessage}</span>}
        <div className='flex gap-4'>
          <Button type='submit'>Save</Button>
          <Button variant='inactive' onClick={() => { onOpenChange(false) }} type='button'>Cancel</Button>
        </div>
      </form>
    </Form>
  )
}

export default EditForm
