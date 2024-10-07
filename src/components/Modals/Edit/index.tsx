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
import { type Company, type Contact, EntityType, useUpdateEntityMutation } from '@/types/graphql'
import { type CompanySchema, type ContactSchema } from '@/types/zod/schema'

interface DataValues {
  data: Company | Contact
}

const EditModal = (params: DataValues) => {
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [activeForm, setActiveFrom] = useState<'Contact' | 'Company'>(params.data.__typename ?? 'Contact')
  const [updateEntity] = useUpdateEntityMutation()

  const onSubmit = async (data: z.infer<typeof CompanySchema> | z.infer<typeof ContactSchema>) => {
    try {
      const response = await updateEntity({
        variables: {
          input: {
            id: params.data.id,
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
          title: `${activeForm} updated succesfully`
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
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className='overflow-y-auto max-h-screen'>
        <DialogHeader className='gap-4'>
          <DialogTitle>Edit the current {params.data.__typename?.toLowerCase()}</DialogTitle>
          <DialogDescription>
            Please review and update the information below to ensure that the details of the selected {params.data.__typename?.toLowerCase()} are accurate and up to date. Once you're finished, click 'Save' to apply your changes.
          </DialogDescription>
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
          {errorMessage && <span className='text-sm text-red-500'>{errorMessage}</span>}
          {activeForm === 'Contact' && (
            <ContactForm
              onOpenChange={setOpen}
              handleSubmit={(data) => {
                void onSubmit(data)
              }}
              data={params.data.__typename === 'Contact' ? params.data : undefined}
            />
          )}
          {activeForm === 'Company' && (
            <CompanyForm
              onOpenChange={setOpen}
              handleSubmit={onSubmit}
              data={params.data.__typename === 'Company' ? params.data : undefined}
            />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditModal
