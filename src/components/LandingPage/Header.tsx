import Link from 'next/link'

export default function Header() {
  return (
    <header id="welcome-section">
      <div className="forest" />
      <div className="silhouette" />
      <div className="moon" />
      <div className="container">
        <h1 className="text-center">
          <span className="block">TicketOrLeave</span>
          <span className="block">
            <span className="color">&</span> enjoy.
          </span>
        </h1>
        <div className="flex mt-4 justify-center items-center">
          <Link
            className="bg-[#f300b4] w-2/4 p-4 border-2 border-transparent text-[#fafafa] text-center uppercase text-base active:border-[1px] active:border-[solid] active:border-[#f300b4] active:-translate-y-[2px] active:[box-shadow:0_10px_100px_-20px_#f300b4]  hover:border-[solid] hover:border-[#f300b4] hover:-translate-y-[2px] hover:[box-shadow:0_10px_100px_-20px_#f300b4] hover:bg-transparent active:bg-transparent"
            href="/api/auth/signin"
          >
            Create an event
          </Link>
        </div>
      </div>
    </header>
  )
}
