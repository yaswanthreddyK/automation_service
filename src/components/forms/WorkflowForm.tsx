import { WorkflowFormSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import {  useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input'

type Props = {
    title?:string,
    subtitle?:string,
}

const WorkflowForm = ({title, subtitle}: Props) => {
    const form = useForm<z.infer<typeof WorkflowFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(WorkflowFormSchema),
        defaultValues: {
            name: '',
            description: '',
        }
    })
    //Handle loading on submit
  const onSubmit = async () => {

  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 min-w-[300px] text-left'>
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid place-items-center'>
        <Button type="submit" className=''>Add Workflow</Button>
        </div>
      </form>
    </Form>
  )
}

export default WorkflowForm