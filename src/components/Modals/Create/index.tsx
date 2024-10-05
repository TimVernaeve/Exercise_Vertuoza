'use client'

import { useState } from 'react'

import CreateForm from '@/components/Form/CreateForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

const CreateModal = () => {
  const [open, setOpen] = useState(false)

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
          <CreateForm onOpenChange={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default CreateModal
