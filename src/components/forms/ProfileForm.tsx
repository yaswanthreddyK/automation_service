'use client'
import { ProfileSchema } from '@/schema/ProfileSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, LoaderIcon, Router } from 'lucide-react'
import { cn } from '@/lib/utils'
import axios, { AxiosError } from 'axios'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

type profileFormProps = {
  username: string;
  email: string
}


const ProfileForm = ({username, email}: profileFormProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            username: username,
            email: email,
        }
    })

    const onSubmit = async (data:  z.infer<typeof ProfileSchema>) => {
       setIsLoading(true)
       try {
        const response = await axios.post(`/api/update-user-profile/`,{
          username: data.username,
          email: data.email,
        })
        if(response.status < 400){
          toast({
            description: 'User details saved',
            variant: 'default'
           })
         }
         router.refresh()
     } catch(error) {
       const axiosErrors = error as AxiosError<string>
       toast({
         description: axiosErrors.response?.data || 'Action Failed',
         variant: 'destructive'
       })
     }finally{
       setIsLoading(false)
     }
    }   
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage className='dark:text-red-700'/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn"  disabled {...field} />
                  </FormControl>
                  <FormMessage className='dark:text-red-700'/>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className='dark:hover:bg-[#2F006B] hover:bg-[#d1b1ff]  hover:text-white '>
                {
                    isLoading ? (
                    <>
                    <Loader2 className='animate-spin mr-2'/> Saving
                    </>
                    ) 
                     : 'Save settings'
                }
            </Button>
          </form>
        </Form>
      )
}

export default ProfileForm