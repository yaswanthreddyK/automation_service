'use client'
import WorkflowForm from '@/components/forms/WorkflowForm'
import CustomModal from '@/components/global/CustomModal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import { Plus } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {}

const WorkflowButton = (props: Props) => {
  const {setOpen, setClose} = useModal()

  const handleClick = () => {
    setOpen(
      <CustomModal title='Create a workflow automation' subheading='Workflows are a powerfull way to automate your tasks'>
        <WorkflowForm />
      </CustomModal>
    )
  }
  return (
    <Button size={'icon'} onClick={handleClick}>
      <Plus />
    </Button>
  )
}

export default WorkflowButton