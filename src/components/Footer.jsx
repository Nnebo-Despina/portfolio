import React from 'react'
import { FaArrowRight, FaTiktok } from 'react-icons/fa'
import '../styles/Footer.css'
import { BsBehance, BsInstagram, BsTelegram, BsTwitterX, BsWhatsapp } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Footer = () => {
    const socials = [
    'behance.net/despinannebs22',
    'x.com/callme_despina',
    'instagram.com/callme_despina',
    'tiktok.com/callme_despina'
  ]
  return (
    <>
        <footer className="footer">
            <div className="footer-header">
                <p className="footer-header-title">Let's <span>Connect</span></p>
                {/* <button><p>Contact Me</p><div><FaArrowRight /></div></button> */}
            </div>
            <div className="footer-body">
                <div className='footer-body-one'>
                    <div className='footer-logo'>
                        <div className='footer-logo-div'></div>
                        <p>Despina</p>
                    </div>
                    <p className='footer-body-one-subh'>My passion is transforming your ideas into clean, modern interfaces that feel smooth, intuitive, and visually striking. 
                        I focus on creating user-friendly experiences and responsive designs that help brands stand out and connect with their audience.</p>
                    <div className='s1-about-social-compile'>
                        <a href={`https://${socials.at(0)}`}><div className="s1-f-social"><BsBehance /></div></a>
                        <a href={`https://${socials.at(1)}`}><div className='s1-f-social'><BsTwitterX /></div></a>
                        <a href={`https://${socials.at(2)}`}><div className='s1-f-social'><BsInstagram /></div></a>
                        <a href={`https://${socials.at(3)}`}><div className='s1-f-social'><FaTiktok /></div></a>
                    </div>
                </div>
                <div className='footer-body-two'>
                    <p className="footer-body-two-header">Navigation</p>
                    <p className="footer-body-two-links"><Link to='/'>Home</Link></p>
                    <p className="footer-body-two-links"><Link to='/services'>Services</Link></p>
                    <p className="footer-body-two-links"><Link to='/about-me'>About Me</Link></p>
                    <p className="footer-body-two-links"><Link to='/projects'>Projects</Link></p>
                    <p className="footer-body-two-links"><Link to='/contact'>Contact Me</Link></p>
                </div>
                <div className='footer-body-two'>
                    <p className="footer-body-two-header">Contact</p>
                    <p className="footer-body-two-links">+234 813 5744 702</p>
                    <p className="footer-body-two-links">thiswebsite.com</p>
                    <p className="footer-body-two-links">despinannebs22@gmail.com</p>
                    <p className="footer-body-two-links">Enugu, Nigeria</p>
                </div>
                <div className='footer-body-two'>
                    <p className="footer-body-two-header">Get To Know More Personally</p>
                    <button><BsWhatsapp /> Add On Whatsapp</button>
                    <button><BsTelegram /> Add On Telegram</button>

                </div>
            </div>
            
        </footer>
        <div className="footer-end">
            Copyright &copy; 2026 <span>Despina.</span> All Rights Reserved.
        </div>
    </>
  )
}

export default Footer