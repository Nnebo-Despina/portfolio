import React from 'react'
import '../styles/ContactMe.css'
import NavBar from '../components/NavBar'
import { MdMail } from 'react-icons/md'
import { BiPhone } from 'react-icons/bi'
import { BsBehance, BsTwitterX, BsX } from 'react-icons/bs'
import { FaArrowRight } from 'react-icons/fa'
import database from '/portfolioData/portfolio-db.json'
import Select from "react-select";


const ContactMe = () => {
  const country = database.countries;

  const sortedCountries = [
    "Nigeria",
    ...country.filter((c) => c !== "Nigeria")
  ];


  const handleWhatsappSubmit = (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("Email").value;
    const phone = document.getElementById("Phone").value;
    const interest = document.getElementById("Interest").value;
    const budget = document.getElementById("Budget").value;
    const country = document.getElementById("Country").value;
    const details = document.getElementById("detail").value;

    const message = `
  Hello Despina 👋🏽
  I want to work with you.

  Name: ${fullName}
  Email: ${email}
  Phone: ${phone}
  Interest: ${interest}
  Budget: ${budget}
  Country: ${country}

  Project Details:
  ${details}
    `;

    const whatsappNumber = "2348135744702";

    const encodedMessage = encodeURIComponent(message);

    // try opening whatsapp app directly
    const appURL = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // fallback (web)
    const webURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // if mobile, try app first
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = appURL;

      // fallback after 1 sec if app fails
      setTimeout(() => {
        window.location.href = webURL;
      }, 1000);
    } else {
      window.open(webURL, "_blank");
    }
};

  return (
    <>
      <NavBar />
      {/* <p className="s1-contact-header">Have a Project? Contact Me</p> */}
      <section className="s1-contact" >
        <div className='s1-contact-dets'>
            <p className="s1-contact-dets-header">Have A Project Idea? <span>Let's Talk About It!</span> </p>
            <br />
            <p className='s1-contact-dets-desc'>I’m always open to new projects and collaborations. If you have an idea in mind, feel free to reach out and let’s turn it into something clean, functional, and visually impactful together.</p>
            <br />
          <div className='s1-contact-info'>
            <div><MdMail /></div>
            <p>despinannebs22@gmail.com</p>
          </div>
          <div className='s1-contact-info'>
            <div><BiPhone /></div>
            <p>+234 813 5744 702</p>
          </div>
          <div className='s1-contact-info'>
            <div><BsBehance /></div>
            <p>despinannebs22</p>
          </div>
          <div className='s1-contact-info'>
            <div><BsTwitterX /></div>
            <p>callmedespina</p>
          </div>
        </div>
        <form className='s1-contact-form' onSubmit={handleWhatsappSubmit}>
          <div className="s1-contact-form-r1">
            <div className="s1-contact-form-r1-div">
              <label htmlFor="fullName">Your Name <span>*</span></label><br />
              <input type="text" id='fullName' placeholder='Ex. John Doe' required/>
            </div>
            <div className="s1-contact-form-r1-div">
              <label htmlFor="Email">Email <span>*</span></label><br />
              <input type="text" id='Email' placeholder='example@gmail.com' required/>
            </div>
          </div>
          <div className="s1-contact-form-r1">
            <div className="s1-contact-form-r1-div">
              <label htmlFor="Phone">Phone <span></span></label><br />
              <input type="text" id='Phone' placeholder='Phone Number'/>
            </div>
            <div className="s1-contact-form-r1-div">

              <label htmlFor="Interest">I'm interested in: <span>*</span></label><br />
              <div className='select-opt'>
                <select name="" id="Interest" required>
                  <option className='select-placeholder' value="" hidden selected>Select</option>
                  <option>Mobile UI/UX Design</option>
                  <option>Website UI/UX Design</option>
                  <option>Frontend Website Development</option>
                </select>
              </div>
            </div>
          </div>
          <div className="s1-contact-form-r1">
            <div className="s1-contact-form-r1-div">
              <label htmlFor="Budget">Budget: <span>*</span></label><br />
              <div className='select-opt'>
                <select name="" id="Budget" required>
                  <option className='select-placeholder' value="" hidden selected>Select Budget</option>
                  <option>&lt; $100</option>
                  <option>$100 - $500</option>
                  <option>$501 - $1000</option>
                  <option>$1001 - $3000</option>
                  <option>$3001+</option>
                </select>
              </div>
            </div>
            <div className="s1-contact-form-r1-div">
              <label htmlFor="Country">Country: <span>*</span></label><br />
              <div className='select-opt'>
                <select name="" id="Country" required>
                  <option className='select-placeholder' value="" hidden selected>Select Country</option>

                  {sortedCountries.map((country, i) => (
                    <option key={i} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <label htmlFor="detail">Project Details: <span>*</span></label><br />
          <textarea name="" id="detail" rows='11' placeholder='Enter here'></textarea>

          <button type='submit'><p>Submit</p><div className='header-desc-svg'><FaArrowRight /></div></button>
          
        </form>
      </section>
    </>
  )
}

export default ContactMe