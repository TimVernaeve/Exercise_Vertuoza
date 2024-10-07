'use client'

import { useState } from 'react'
import { type z } from 'zod'

import CompanyForm from '@/components/Form/Company'
import ContactForm from '@/components/Form/Contact'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import { EntityType, useCreateEntityMutation } from '@/types/graphql'
import { type CompanySchema, type ContactSchema } from '@/types/zod/schema'

const CreateModal = () => {
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [activeForm, setActiveFrom] = useState<'Contact' | 'Company'>('Contact')
  const [createEntity] = useCreateEntityMutation()

  const onSubmit = async (data: z.infer<typeof CompanySchema> | z.infer<typeof ContactSchema>) => {
    try {
      const response = await createEntity({
        variables: {
          input: {
            entityType: activeForm === 'Contact' ? EntityType.Contact : EntityType.Company,
            name: data.name,
            ...(data.type === EntityType.Contact
              ? {
                  email: data.email,
                  phone: data.phone
                }
              : {
                  industry: data.industry,
                  contactEmail: data.contactEmail
                })
          }
        }
      })

      if (response.data) {
        setOpen(false)
        toast({
          title: `New ${activeForm} added succesfully`
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

  return (
    <Dialog open={open}>
      <DialogTrigger asChild className='w-fit'>
        <Button onClick={() => { setOpen(true) }} variant='secondary'>
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className='overflow-y-auto max-h-screen'>
        <DialogHeader className='gap-4'>
          <DialogTitle>Create a new company or contact</DialogTitle>
          <DialogDescription>Please review and update the information below to ensure that the details of the selected contact or company are accurate and up to date. Once you're finished, click 'Save' to apply your changes.</DialogDescription>
          <div className='flex gap-4'>
            <Button
              variant={activeForm === 'Contact' ? 'active' : 'inactive'}
              className='w-fit'
              type='button'
              onClick={() => { setActiveFrom('Contact') }}
            >
              Contact
            </Button>
            <Button
              variant={activeForm === 'Company' ? 'active' : 'inactive'}
              type='button'
              onClick={() => { setActiveFrom('Company') }}
            >
              Company
            </Button>
          </div>
          {activeForm === 'Contact' && (
            <ContactForm
              handleSubmit={(data) => {
                void onSubmit(data)
              }}
              onOpenChange={setOpen}
            />
          )}
          {activeForm === 'Company' && (
            <CompanyForm
              handleSubmit={(data) => {
                void onSubmit(data)
              }}
              onOpenChange={setOpen}
            />
          )}
          {errorMessage && <span className='text-sm text-red-500'>{errorMessage}</span>}
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default CreateModal
