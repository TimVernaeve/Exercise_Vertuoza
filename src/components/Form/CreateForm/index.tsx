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
import { EntityType, useCreateEntityMutation } from '@/types/graphql'
import { type ValueData } from '@/types/types'
import { ContactSchema, CompanySchema } from '@/types/zod/createSchema'

const getFormSchema = (type: EntityType) => {
  return type === EntityType.Contact ? ContactSchema : CompanySchema
}

type FormData = z.infer<ReturnType<typeof getFormSchema>>

const CreateForm = ({ onOpenChange }: { onOpenChange: (isOpen: boolean) => void }) => {
  const { toast } = useToast()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [entityType, setEntityType] = useState<EntityType>(EntityType.Contact)
  const [createEntity] = useCreateEntityMutation()

  const formSchema = getFormSchema(entityType)

  const defaultValues = {
    CONTACT: {
      entityType,
      name: '',
      email: '',
      phone: ''
    },
    COMPANY: {
      entityType,
      name: '',
      industry: '',
      contactEmail: ''
    }
  }

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues.CONTACT
  })

  const onSubmit = async (values: FormData) => {
    try {
      const valueData = values as ValueData

      const response = await createEntity({
        variables: {
          input: {
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
          title: `New ${entityType.toLowerCase()} added succesfully`
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
    if (type === entityType) return
    setEntityType(type)

    // Use a timeout to allow React to process the state change first (queue system)
    setTimeout(() => {
      form.reset(defaultValues[type])
    }, 0)
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
                This is your {entityType === EntityType.Contact ? 'email' : 'industry'}.
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
          <Button type='submit'>Create</Button>
          <Button variant='inactive' onClick={() => { onOpenChange(false) }} type='button'>Cancel</Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateForm
