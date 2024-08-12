'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as LR from '@uploadcare/blocks'
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

LR.registerBlocks(LR);

type UploadcareProps = {
  onSuccessfulUpload: (imageURL: string) => void
}

const UploadcareButton = ({onSuccessfulUpload}: UploadcareProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<LR.OutputFileEntry<'success'>[]>([]);
  const theme = useTheme().resolvedTheme === 'dark' ? "my-config-dark" : 'my-config-light'
  const ctxProviderRef =  useRef<InstanceType<LR.UploadCtxProvider>>(null);
  const router = useRouter()
  const {toast} = useToast()
  useEffect(()=>{

    const handleDone = (e: CustomEvent<LR.OutputCollectionState>) => {
      ctxProviderRef.current?.uploadCollection.clearAll()
      router.refresh()
    }

    const handleModalClose = (e: CustomEvent<void>) => {
      ctxProviderRef.current?.uploadCollection.clearAll()
      router.refresh()
    }

    const handleFileUploadSuccessful = (e: CustomEvent<LR.OutputFileEntry>) => {
      const profileImageURL = e.detail.cdnUrl
      onSuccessfulUpload(profileImageURL as string)
    }

    const handleFileUploadFailed = (e: CustomEvent<LR.OutputFileEntry>) => {
      toast({
        title: 'Failed to upload',
        description: e.detail.errors.join(', '),
        variant: 'destructive'
      })
    }

    ctxProviderRef.current?.addEventListener('done-click',handleDone)
    ctxProviderRef.current?.addEventListener('modal-close', handleModalClose)
    ctxProviderRef.current?.addEventListener('file-upload-success', handleFileUploadSuccessful)
    ctxProviderRef.current?.addEventListener('file-upload-failed', handleFileUploadFailed)

    return () => {
      ctxProviderRef.current?.removeEventListener('done-click',handleDone)
      ctxProviderRef.current?.removeEventListener('modal-close', handleModalClose)
      ctxProviderRef.current?.removeEventListener('file-upload-success', handleFileUploadSuccessful)
      ctxProviderRef.current?.removeEventListener('file-upload-failed', handleFileUploadFailed)
    }
  },[])
  return (
    <div>

    <lr-config
    ctx-name="my-uploader"
    pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
    img-only="true"
    multiple={false}
    max-local-file-size-bytes="154288000"
    use-cloud-image-editor="true"
    source-list="local, url, camera, dropbox, gdrive, gphotos"
    >
    </lr-config>
      <lr-file-uploader-regular ctx-name="my-uploader" css-src={"https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css"} ></lr-file-uploader-regular>
      <lr-upload-ctx-provider ref={ctxProviderRef} ctx-name="my-uploader"></lr-upload-ctx-provider>

    </div>
  )
}

export default UploadcareButton