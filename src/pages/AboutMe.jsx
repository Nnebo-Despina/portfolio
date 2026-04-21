import React, { useState } from 'react'
import '../styles/AboutMe.css'
import NavBar from '../components/NavBar'
import { BiPhone } from 'react-icons/bi'
import TransparentPic from '/img/IMG_3375-removebg-preview.png'
import { GoLocation } from 'react-icons/go'
import { CgMail } from 'react-icons/cg'
import { BsBehance, BsInstagram, BsTwitterX } from 'react-icons/bs'
import { FaTiktok } from 'react-icons/fa'

const AboutMe = () => {
  const socials = [
    'behance.net/despinannebs22',
    'x.com/callme_despina',
    'instagram.com/callme_despina',
    'tiktok.com/callme_despina'
  ]
  const [selected, setSelected] = useState('beh')


  return (
    <>
      <NavBar />
      <section className="s1-about">
        <div className="s1-about-details">
          <p className="s1-about-header">Hello,<br /> I'm Despina!</p>
          <br />
          <p className="s1-about-desc">I’m a creative UI/UX designer and front-end developer who enjoys turning ideas into clean, functional, and visually engaging digital experiences. I focus on building interfaces that feel intuitive, modern, and easy to use while solving real user problems.</p>
          <br /><br />
          <div className='s1-about-social-compile'>
            <div className={`s1-about-social ${selected == "beh" ? "socialShow" : ""}`}
             onClick={() => setSelected("beh")}>
              <BsBehance /><a href={`https://${socials.at(0)}`}>{socials.at(0)}</a>
            </div>
            <div className={`s1-about-social ${selected == "x" ? "socialShow" : ""}`}
             onClick={() => setSelected("x")}>
              <BsTwitterX /><a href={`https://${socials.at(1)}`}>{socials.at(1)}</a>
            </div>
            <div className={`s1-about-social ${selected == "inst" ? "socialShow" : ""}`}
             onClick={() => setSelected("inst")}>
              <BsInstagram /><a href={`https://${socials.at(2)}`}>{socials.at(2)}</a>
            </div>
            <div className={`s1-about-social ${selected == "tikt" ? "socialShow" : ""}`}
             onClick={() => setSelected("tikt")}>
              <FaTiktok /><a href={`https://${socials.at(3)}`}>{socials.at(3)}</a>
            </div>

          </div>
          
        </div>

        <div className="s1-about-birthdate">22nd May 2010</div>
        <div className="s1-about-nationality">Nigerian</div>

        <div className="s1-about-profile">
          <div className="s1-about-profile-img">
            <div className="s1-about-profile-circle"></div>
            <img src={TransparentPic} alt="" />
          </div>
          <div className="s1-about-profile-details">
            <p className="profile-details-header">Contacts</p>
            <div className="s1-about-profile-contact-det">
              <div><GoLocation /> Enugu, Nigeria</div>
              <div><CgMail /> despinannebs22@gmail.com</div>
              <div><BiPhone /> +234 813 5744 702</div>
            </div>
          </div>
        </div>
      </section>
      <section className="s2-about">
        <div className="s2-about-experience">
          <p className="s2-exp-header">Experience</p>
          <br />
          <div className="s2-exp-one">
            <div className="s2-exp-circle-div">
              <div className="s2-exp-circle"></div>
              <div className="about-line"></div>
              <p>2026</p>
            </div>
            <div className="s2-exp-desc">
              <p>App Front End Developer ~ Flutter</p>
              <p>Worked on building responsive interfaces and improving user experience across multiple mobile applications, focusing on performance, accessibility, and clean design.</p>
            </div>
            
          </div>
          <br />
          <div className="s2-exp-one">
            <div className="s2-exp-circle-div">
              <div className="s2-exp-circle"></div>
              <div className="about-line"></div>
              <p>2025</p>
            </div>
            <div className="s2-exp-desc">
              <p>Web Front End Development ~ React</p>
              <p>Worked on building responsive interfaces and improving user experience across multiple websites & webapps, focusing on performance, accessibility, and clean design.</p>
            </div>
          </div>
          <br />
          <div className="s2-exp-one">
            <div className="s2-exp-circle-div">
              <div className="s2-exp-circle"></div>
              <p>2025</p>
            </div>
            <div className="s2-exp-desc">
              <p>UI/UX Design ~ Figma</p>
              <p>Worked on building responsive interfaces and creating user experience across multiple web & mobile sites and applications, focusing on performance, accessibility, and clean design.</p>
            </div>
          </div>
        </div>
        <div className="s2-about-education">
          <p className="s2-edu-header">Education</p>
          <br />
          <div className="s2-edu-one">
            <div className="s2-edu-circle-div">
              <div className="s2-edu-circle"></div>
              <div className="about-line"></div>
              <p>2026</p>
            </div>
            <div className="s2-edu-desc">
              <p>App Front End Development ~ Flutter</p>
              <p>Studied core principles of app development and design, gaining practical skills in building responsive, user-friendly digital products.</p>
            </div>
          </div>
          <br />
          <div className="s2-edu-one">
            <div className="s2-edu-circle-div">
              <div className="s2-edu-circle"></div>
              <div className="about-line"></div>
              <p>2026</p>
            </div>
            <div className="s2-edu-desc">
              <p>Web Front End Development ~ React</p>
              <p>Studied core principles of web development and UI/UX design, gaining practical skills in building responsive, user-friendly digital products.</p>
            </div>
          </div>
          <br />
          <div className="s2-edu-one">
            <div className="s2-edu-circle-div">
              <div className="s2-edu-circle"></div>
              <p>2025</p>
            </div>
            <div className="s2-edu-desc">
              <p>UI/UX Design ~ Figma</p>
              <p>Studied core principles of website & app development and UI/UX design, gaining practical skills in building responsive, user-friendly digital products.</p>
            </div>
          </div>
        </div>
        
      </section>
      {/* <section className="s3-about">
        <p className="s3-header">My Awards <br /><span>& Recoginition</span></p>
        <br />
        <div className="s3-award-cont">

        </div>
        <div className="s3-award-desc">

        </div>
      </section> */}
    </>
  )
}

export default AboutMe