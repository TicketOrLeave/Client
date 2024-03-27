'use client'
import { Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export function CopyEventLink({ link }: { link: string }) {
  const [isCopied, setIsCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2500)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="underline hover:cursor-pointer text-green-500 grid gap-1 md:text-base lg:text-sm/relaxed xl:text-base/relaxed dark:text-gray-400">
          Copy Event Link
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Anyone who has this link will be able to reserve a ticket.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" value={isCopied ? 'Copied!' : link} readOnly />
          </div>
          <Button type="submit" onClick={() => copyLink()} size="sm" className="px-3 bg-green-400 hover:bg-green-500">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className='border border-green-400 text-green-400 hover:text-white hover:bg-green-400 bg-white'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
