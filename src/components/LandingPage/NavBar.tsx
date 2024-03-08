import Link from 'next/link'

export default function Navbar() {
  return (
    <nav id="navbar" className="fixed z-[9999] w-full p-4 flex justify-center">
      <div className="nav-wrapper w-full flex justify-between items-center max-w-[1400px] py-0 px-8">
        <p className="text-2xl text-gray-100 cursor-default">
          Ticket
          <strong>OrLeave</strong>
        </p>
        <Link
          className="text-white text-2xl no-underline [transition:200ms] hover:text-[#f300b4]"
          href="/api/auth/signin"
        >
          Login
        </Link>
      </div>
    </nav>
  )
}
