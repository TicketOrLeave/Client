import SocialLinks from "./SocialLinks";

export default function Menu({ showMenu, toggleMenu }: any) {
  return (
    <div className={`menu-container ${showMenu ? 'active' : ''}`}>
      <div className="overlay" />
      <div className="menu-items">
        <ul>
          <li>
            <a href="#welcome-section" onClick={toggleMenu}>
              HOME
            </a>
          </li>
          <li>
            <a href="#about" onClick={toggleMenu}>
              ABOUT
            </a>
          </li>
          <li>
            <a href="#projects" onClick={toggleMenu}>
              PORTFOLIO
            </a>
          </li>
          <li>
            <a href="#contact" onClick={toggleMenu}>
              CONTACT
            </a>
          </li>
        </ul>
        <SocialLinks />
      </div>
    </div>
  )
}

