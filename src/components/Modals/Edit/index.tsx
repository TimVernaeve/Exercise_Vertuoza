'use client'

import { useState } from 'react'

import EditForm from '@/components/Form/EditForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { type Company, type Contact } from '@/types/graphql'

interface DataValues {
  data: Company | Contact
}

const EditModal = (params: DataValues) => {
  const [open, setOpen] = useState(false)

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
          <EditForm onOpenChange={setOpen} data={params.data} />
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default EditModal
