import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer>
      <div className="wrapper bg-white">
        <h3 className="text-blue-700">THANKS FOR VISITING</h3>
        <p>© {new Date().getFullYear()} TicketOrLeave.</p>
        <SocialLinks />
      </div>
    </footer>
  )
}
