import './styles/ticket.css'
interface TicketProps {
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  hasButton: boolean
}
export default function Ticket({ title, subtitle, buttonText, buttonLink, hasButton }: TicketProps) {
  return (
    <div className="inline-block transform rotate-5 scale-95 transition-transform duration-350 ease-in-out">
      <div className="ticket">
        <div className="ticket__inner">
          <div className="ticket__border">
            <span className="border-blue-900"></span>
            <span className="border-blue-900"></span>
          </div>
          <h2 className="ticket__title text-green-500 font-mukta text-3xl uppercase">
            {title}
            <strong className="text-blue-900">TutTrue.</strong>
          </h2>
          <p className="ticket__text text-lg">{subtitle}</p>
          {hasButton && (
            <a
              href={buttonLink}
              className="ticket__btn btn btn--go-icon inline-block bg-green-500 text-white font-mukta text-2xl py-3 px-6 rounded-full transition duration-150 ease-in-out hover:bg-white hover:text-blue-900 focus:outline-none focus:bg-white focus:text-blue-900"
            > {/* className:  ticket__btn btn btn--go-icon*/}
              {buttonText}
              <span className="bg-blue-900 text-white rounded-full h-14 w-14 flex items-center justify-center ml-4">
                Go
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
