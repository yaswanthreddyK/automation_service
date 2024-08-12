'use client'
import React, { useState } from 'react'
import UploadcareButton from './uploadcare-button'
import { Loader2, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import db from '@/lib/dbConnect'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'

type ProfileProps = {
  clerkId: string;
  imageURL: string;
}

const ProfilePicture = ({clerkId, imageURL}: ProfileProps) => {
  const [removingProfile, setRemovingProfile] = useState(false)
  const router = useRouter()
  const handleRemoveUserProfile = async () => {
    setRemovingProfile(true)
    try {
       const response = await axios.delete(`/api/remove-profile/${clerkId}`)
       if(response.status < 400){
         toast({
           description: 'Profile image removed',
           variant: 'default'
          })
        }
        router.refresh()
    } catch (error) {
      const axiosErrors = error as AxiosError<string>
      toast({
        description: axiosErrors.response?.data || 'Failed to remove image',
        variant: 'destructive'
      })
    }finally{
      setRemovingProfile(false)
    }
  
  }
  const handleProfilePictureUpload = async (imageURL: string) => {
    try {
      const response = await axios.post(`/api/upload-profile`,{
        profileImage: imageURL,
        clerkId,
      })
      if(response.status < 400){
        toast({
          description: 'Profile image uploaded',
          variant: 'default'
         })
       }
    } catch (error) {
      console.log(error) // remove it------
      toast({
        description: 'Failed to upload image',
        variant: 'destructive'
      })
    }
  }
  return (
    <>
    <div className='w-24 h-24 rounded-full border-[1px] my-4 grid place-content-center'>
      {
        imageURL ? <img className="w-full h-full object-contain" src={imageURL} alt='Profile Image'  /> :  <UserRound size={80}/>
      }
           
          </div>
          {
            imageURL ?  
          <Button className='text-xs px-3' variant={'secondary'} onClick={handleRemoveUserProfile} disabled={removingProfile}>
           {removingProfile ? 
            <Loader2 className='animate-spin'/> :
            'Remove Profile'
          }
            </Button> 
          :
          <div>
          <UploadcareButton onSuccessfulUpload={handleProfilePictureUpload}/>
        </div>
          }
   
    </>
  )
}

export default ProfilePicture