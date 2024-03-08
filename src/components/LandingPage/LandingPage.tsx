'use client'
import React, { useEffect, useState } from 'react'
import './styles/landing.css'
import Navbar from './NavBar'
import Header from './Header'
import About from './About'
import Tickets from './Tickets'
import Contact from './Contact'
import Footer from './Footer'

export default function LandingPage() {

  useEffect(() => {
    const navbar = document.querySelector('#navbar') as HTMLElement
    const header = document.querySelector('#welcome-section') as HTMLElement
    const forest = document.querySelector('.forest') as HTMLElement
    const silhouette = document.querySelector('.silhouette') as HTMLElement
    let forestInitPos = -300

    const handleScroll = () => {
      let scrollPos = document.documentElement.scrollTop || document.body.scrollTop

      if (scrollPos <= window.innerHeight) {
        silhouette.style.bottom = `${scrollPos / 6}px`
        forest.style.bottom = `${forestInitPos + scrollPos / 6}px`
      }

      if (scrollPos - 100 <= window.innerHeight) {
        header.style.visibility = header.style.visibility === 'hidden' ? 'visible' : header.style.visibility
      } else {
        header.style.visibility = 'hidden'
      }

      if (scrollPos + 100 >= window.innerHeight) {
        navbar.classList.add('bg-active')
      } else {
        navbar.classList.remove('bg-active')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Tickets />
      <Contact />
      <Footer />
    </>
  )
}
