import React from 'react'
import { Input } from '../ui/input'
import { Book, Headphones, Search } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { UserButton } from '@clerk/nextjs'

const Infobar = () => {

  return (
    <div className='flex items-center justify-end gap-8 px-5'>
        <div className='flex items-center gap-2 border-[1px] py-[5px] px-4 bg-muted rounded-full my-2'>
            <Search />
            <Input type='text' placeholder='Quick search' className='bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-1 !py-0 h-5 border-[0px]'/>
        </div>
        <div className='flex items-center gap-4'>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger>
                        <Headphones size={18} className='my-2'/>
                    </TooltipTrigger>
                    <TooltipContent  side='bottom'>Customer Support</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <Book size={18} className='my-2'/>
                    </TooltipTrigger>
                    <TooltipContent>Guide</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>  
        <UserButton />    
    </div>
  )
}

export default Infobar