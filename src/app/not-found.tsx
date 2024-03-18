import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="flex items-center">
        <Image src="/error404.gif" alt="404" width={150} height={150} />
        <h1 className="text-3xl font-bold"> - Page Not Found</h1>
      </div>
      <Link className="font-medium underline" href="/">
        Go Back Home
      </Link>
    </div>
  )
}
