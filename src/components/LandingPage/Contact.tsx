import SocialLinks from './SocialLinks'

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="heading-wrapper">
          <div className="heading">
            <p className="title">
              Want to <br />
              contact us?
            </p>
            <p className="separator" />
            <p className="subtitle">
              Please, use the form below or send an email to {''}
              <span className="mail">
                us@
                {/* <i className="fas fa-at at" /> */}
                TicketOrLeave.
                {/* <i className="fas fa-circle dot" /> */}
                com
              </span>
              :
            </p>
          </div>
          <SocialLinks />
        </div>
        <form id="contact-form" action="#">
          <input placeholder="Name" name="name" type="text" required />
          <input placeholder="Email" name="email" type="email" required />
          <textarea placeholder="Message" name="message" />
          <input className="button" id="submit" value="Submit" type="submit" />
        </form>
      </div>
    </section>
  )
}
