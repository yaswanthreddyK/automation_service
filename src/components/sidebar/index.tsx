'use client'
import { menuOptions } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import { LucideMousePointerClick } from 'lucide-react'
import { ModeToggle } from '../global/ModeToggle'

const Sidebar = () => {
    const pathname = usePathname()
  return (
    <nav className='dark:bg-black h-screen overflow-scroll flex flex-col items-center justify-between gap-10 py-6 px-2'>
        <div className='flex flex-col items-center justify-center gap-1 h-full'>
            <Link href='/' className='mb-4'>
            <Image
          src='/fuzzieLogo.png'
          width= {15}
          height={15}
          alt='fuzzie logo'
        />
            </Link>
                <TooltipProvider delayDuration={0}>
            <ul className='flex flex-col items-center gap-4'>
            {
                menuOptions.map((menu, index) => {
                    return (
                        <Tooltip key={menu.name}>
                            <TooltipTrigger>
                                <li className={clsx('group p-2 rounded-md',{
                                    'dark:bg-[#2F006B] bg-[#EEE0FF]' : pathname === menu.href
                                })}>
                                <Link href={menu.href}>
                                <menu.Component selected={pathname === menu.href} />
                                </Link>
                                </li>
                            </TooltipTrigger>
                                <TooltipContent
                                side='right'
                                >
                                    <p>{menu.name}</p>
                                </TooltipContent>
                            </Tooltip>
                    )
                })
            }
            </ul>
            </TooltipProvider>
            <Separator className='my-4'/>

            {/* <div className='dark:bg-[#353346]/30 h-56 overflow-scroll px-2 py-3 border-[1px] rounded-full'>
                <div className='relative dark:bg-[#353346]/70 p-1 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]'>
                    <LucideMousePointerClick  className='dark:text-white' size={14}/>
                </div>
            </div> */}

            <div className='flex flex-col justify-end h-full'>
                <ModeToggle />
            </div>
        </div>
    </nav>
  )
}

export default Sidebar