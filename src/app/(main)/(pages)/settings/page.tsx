import ProfileForm from '@/components/forms/ProfileForm'
import React, { useState } from 'react'
import ProfilePicture from './_components/profile-picture'
import { currentUser } from '@clerk/nextjs/server'
import db from '@/lib/dbConnect'
import { useRouter } from 'next/router'
import { redirect } from 'next/navigation'

const Settings = async () => {
  const authUser = await currentUser()
  if(!authUser) return redirect('/sign-in')
  const user = await db.user.findUnique({
    where:{
      clerkId: authUser.id,
    },
  })
  return (
    <div className='flex flex-col gap-4 relative'>
         <h1 className='text-xl sticky top-0 z-[10] py-4 px-6 bg-background/50 backdrop-blur-lg flex items-center border-b'>
        Settings
      </h1>
      <div className='md:py-4 md:px-8 sm:px-4 px-4 py-2 m-auto sm:min-w-[500px] min-w-[300px] sm:border-[1px] rounded-xl'>
        <h3 className='text-xl'>User Profile</h3>
        <p className='text-sm text-black/70 dark:text-white/50 mb-4'>Update your information</p>
        <div className='mb-4'>
          <h3 className=''>Profile Image</h3>
          <ProfilePicture clerkId={user?.clerkId as string} imageURL={user?.profileImage as string} />
        </div>
        <div className=''>
        <ProfileForm username={user?.name || ""} email={user?.email || ""}/>
        </div>
      </div>
    </div>
  )
}

export default Settings