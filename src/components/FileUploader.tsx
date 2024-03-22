'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'

type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string | undefined
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  })

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex border p-2 cursor-pointer flex-col overflow-hidden rounded-md bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <Image src={imageUrl} alt="image" width={250} height={250} className="w-full object-cover object-center" />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500 justify-center items-center flex">
          <Image src="/upload.svg" width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2 text-[#a9a9a9]">Drag photo here or Click and select</h3>
        </div>
      )}
    </div>
  )
}
