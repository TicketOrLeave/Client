import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border border-t bg-gray-50 p-2 dark:bg-gray-950 flex flex-col justify-center items-center mt-6">
      <p className="text-center text-gray-500 dark:text-gray-400 text-sm font-mono">
        © 2023 TicketOrLeave. All rights reserved.
      </p>
      <p className="text-center text-gray-500 dark:text-gray-400 font-mono text-sm">
        Created by{' '}
        <span>
          <Link href="https://github.com/TutTrue" className="hover:text-green-500">Mahmoud Hamdy</Link>
          ,
          <Link href="https://github.com/EmadAnwer" className="hover:text-green-500">Emad Anwer</Link>&nbsp;and&nbsp;<Link href="https://github.com/MarioNageh" className="hover:text-green-500">Mario Nageh</Link>
        </span>
      </p>
    </footer>
  )
}
