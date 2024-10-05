'use client'

import { useState } from 'react'

import CreateForm from '@/components/Form/CreateForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
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
      <DialogContent>
        <DialogHeader className='gap-4'>
          <DialogTitle>Create a new company or contact</DialogTitle>
          <CreateForm onOpenChange={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default CreateModal
