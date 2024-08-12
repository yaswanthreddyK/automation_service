import Infobar from '@/components/infobar'
import Sidebar from '@/components/sidebar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

type Props = {children: React.ReactNode}

const layout = (props: Props) => {
  return (
    <div className='flex overflow-hidden h-screen'>
      <Sidebar />
      <div className='w-full'>
        <Infobar />
        <div className=''>
            {props.children}
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default layout