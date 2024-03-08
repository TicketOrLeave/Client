import Ticket from './Ticket'

export default function Projects() {
  return (
    <section id="projects" className='min-h-screen text-2xl relative bg-gray-100 mt-[-10rem] z-[1] bg-[linear-gradient(215deg,_#f0f0f0_0%,#fafafa_100%)]'>
      <div className="max-w-[1400px] mx-[auto] my-[0] w-full pt-48 px-20 pb-32"> {/* className:  projects-container*/}
        <div className="heading"> {/* className:  heading*/}
          <h3 className="text-center text-[2.4rem] leading-[2.4rem]">Why TicketOrLeave ?</h3> {/* className:  title*/}
          <p className="bg-[#f300b4] w-[150px] h-[2px] mx-[auto] my-4" /> {/* className:  separator*/}
        </div>
        <div className="flex justify-center items-center flex-wrap gap-4 m-6">
          <Ticket
            title="Easy Event Creation."
            subtitle="Creating an event with Eventify is a breeze. Simply fill in the details, set the date and time."
            buttonText=""
            buttonLink=""
            hasButton={false}
          />
          <Ticket
            title="Customizable Event Pages."
            subtitle="Stand out from the crowd with beautifully designed event pages that reflect your brand identity."
            buttonText=""
            buttonLink=""
            hasButton={false}
          />
          <Ticket
            title="Seamless Ticketing Integration."
            subtitle="Say goodbye to manual ticket distribution. With Eventify, when attendees join your event link, their tickets are automatically sent to their email inbox. Simply fill in the details, set the date and time."
            buttonText=""
            buttonLink=""
            hasButton={false}
          />
        </div>
      </div>
    </section>
  )
}
