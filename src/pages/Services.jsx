import React, { useState } from 'react'
import '../styles/Services.css'
import NavBar from '../components/NavBar'
import { FaLaptopCode } from 'react-icons/fa'
import { PiPackage } from 'react-icons/pi'
import { BiMoney, BiPlus } from 'react-icons/bi'
import { CiMoneyBill, CiMoneyCheck1 } from 'react-icons/ci'
import FAQArray from "../../public/portfolioData/portfolio-db.json" 
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'

const Services = () => {
  const FAQ = FAQArray.FAQ
  
  const [activeId, setActiveId] = useState(null)
  
  const toggleAnswer = (id) => {
    setActiveId(activeId === id ? null : id);
  };


  return (
    <>
      <NavBar />
      <section className="s1-services">
        <p className="s1-services-header">Learn More About My Process</p>
        <p className="s1-services-subheader">
          My design process is simple, structured, and focused on results. I take every project from idea to polished interface with clarity, creativity, and attention to detail at every step.
        </p><br /><br />
        <div className="s1-services-items-cont">
          <div className='s1-services-items'>
            <div className="services-items-icon">
              <PiPackage />
            </div>
            <div className='s1-services-items-desc'>
              <p>Give A Project</p>
              <p className="s1-services-subheader">
  My design process is simple, structured, and focused on results. I take every project from idea to polished interface with clarity, creativity, and attention to detail at every step.
</p>
            </div>
            <div className='s1-services-items-num'>
              <p>01</p>
            </div>

          </div>
          <div className='s1-services-items-same'>
            <div className='s1-services-items-num'>
              <p>02</p>
            </div>
            
            <div className='s1-services-items-desc'>
              <p>Make Your Payment</p>
              <p>
  Once everything is confirmed, we proceed with a smooth and transparent payment process to kickstart the design or development work.
</p>
            </div>
            <div className="services-items-icon-same">
              <CiMoneyCheck1 />
            </div>
          </div>
          <div className='s1-services-hide'></div>
          <div className='s1-services-items'>
              <div className="services-items-icon">
                  <FaLaptopCode />
              </div>
              <div className='s1-services-items-desc'>
                <p>Recieve Your Work</p>
                <p>
  After development, you receive a fully refined and responsive product ready for use, feedback, or deployment depending on your needs.
</p>
              </div>
              <div className='s1-services-items-num'>
                <p>03</p>
              </div>
          </div>
        </div>
      </section>
      <section className='s2-services'>
        <div className='s2-services-header'>
          <p className="s2-services-header-one">Frequently Asked</p>
          <span className="s2-services-header-two">Questions</span>
          <br />
          <p className="s2-services-header-desc">
  Here are answers to some common questions about my process, pricing, delivery, and how I work with clients to bring ideas into real digital products.
</p>
        </div>
        <div className='s2-services-details'>

          {
            FAQ.map((faq) => (
              <div className={`s2-services-question ${activeId === faq.id ? 'isActive' : ''}`}>
                <div className="s2-services-question-top">
                  <p>{faq.question}</p>
                  <div onClick={() => toggleAnswer(faq.id)}><BiPlus /></div>
                </div>
                  <p className="s2-services-answer">{faq.answer}</p>
              </div>
            ))
          }
          
        </div>
      </section>
      
      <ScrollAnimation />
      <Footer />
    </>
  )
}

export default Services