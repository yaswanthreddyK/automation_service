'use client'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    name: string,
    description: string,
    id: string,
    publish: boolean
}

const Workflow = ({name, description, id, publish = false}: Props) => {
  const form = useForm({
    defaultValues: {
      publish: publish
    }
  })
  const isPublished = form.watch('publish')
  const handleTogglePublish = (e: any) => {
    form.setValue('publish', !isPublished)
    }
  return (
    <Card className='w-full flex items-center justify-between'>
        <CardHeader className='flex flex-col gap-4'>
            <Link href={`/workflows/editor/${id}`}>
            <div className='flex gap-4 mb-3'>
            <Image
              src="/googleDrive.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
            <Image
              src="/notion.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
            <Image
              src="/discord.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
            </div>
          <div className="">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
            </Link>
        </CardHeader>
        <Switch className='mx-4' {...form.register('publish')} checked={isPublished} onCheckedChange={handleTogglePublish}/>
    </Card>
  )
}

export default Workflow