import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import FirstPic from '/img/IMG_3378.JPG'
import SecondPic from '/img/IMG_3375.JPG'
import '../styles/Home.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { BsStarFill } from 'react-icons/bs'
import { LuQuote } from 'react-icons/lu'
import testimonalArray from "../../public/portfolioData/portfolio-db.json" 
import { RiStarFill } from 'react-icons/ri'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import Figma from '/img/Figma.jfif'
import Sketch from '/img/Sketch.jfif'
import VSCode from '/img/VSCode.jfif'
import { Link } from 'react-router-dom'

const Home = () => {
    const testimonal = testimonalArray.testimonals
    const data = testimonalArray.projects

    function starReview(starNo) {
         return (
            <div className="rating-review">
            {Array.from({ length: starNo }, (_, i) => (
                <RiStarFill key={i} color='orange'/>
            ))}
            </div>
        );
  }
  
    return (
        <>
            <NavBar />
            <section className="s1-home">
                <div className='header-pic'>
                    <img src={FirstPic} alt="" />
                </div>
                <div className="header-desc">
                    <div className="header-desc-first">
                        <p>Hi! I'm Despina,</p><br />
                        <p>A UI/UX Designer <br /><span>and Front End</span><br />Developer</p>
                    </div>
                    <br />
                    <p className='header-desc-details'>
                        My passion is transforming your ideas into clean, modern interfaces that feel smooth, intuitive, and visually striking. 
                        I focus on creating user-friendly experiences and responsive designs that help brands stand out and connect with their audience.
                    </p>
                    <br /><br />
                    <Link to="contact"><button><p>Contact Me</p><div className='header-desc-svg'><FaArrowRight /></div></button></Link>
                </div>
                <div className="header-stats">
                    <div>
                        <p>1+</p>
                        <p>Years of Experience</p>
                    </div>
                    <div>
                        <p>{data.length}</p>
                        <p>Completed Projects</p>
                    </div>
                    <div>
                        <p>100%</p>
                        <p>Client Satisfaction</p>
                    </div>
                    <div>
                        <p>1</p>
                        <p>Clients Worldwide</p>
                    </div>
                </div>
            </section>

            <ScrollAnimation />

            <section className='s2-home'>
                <div className="s2-intro-desc">
                    <img src={SecondPic} alt="" />
                </div>
                <div className="s2-intro-details">
                    <div>
                        <p>About Me</p>
                        <h2>Who is Despina Nnebo?</h2> 
                        <p>
                            I’m a creative UI/UX designer and front-end developer who loves turning ideas into real products. 
                            I enjoy building designs that are simple, beautiful, and easy to use while ensuring every screen feels consistent and purposeful. 
                            I’m passionate about solving problems through design and creating experiences people actually enjoy.
                        </p>
                    </div>
                    <Link to="contact"><button><p>Contact Me</p><div className='header-desc-svg'><FaArrowRight /></div></button></Link>
                </div>
            </section>

            <section className='s3-home'>
                <p>My Favourite Tools</p><br />
                <p className='s3-home-h1'>Exploring The Tools <br /><span>Behind My Process</span></p> <br /><br />

                <div className="s3-home-tool-cont">
                    <div className='s3-home-tool'>
                        <div className='s3-home-tool-inner'>
                            <div style={{backgroundImage: `url(${VSCode})`}} className='s3-home-tool-image'></div>
                            <h2>97%</h2>
                        </div>
                        <p>VS Code</p>
                    </div>
                    <div className='s3-home-tool'>
                        <div className='s3-home-tool-inner'>
                            <div style={{backgroundImage: `url(${Figma})`}} className='s3-home-tool-image'></div>
                            <h2>90%</h2>
                        </div>
                        <p>Figma</p>
                    </div>
                    <div className='s3-home-tool'>
                        <div className='s3-home-tool-inner'>
                            <div  style={{backgroundImage: `url(${Sketch})`}}  className='s3-home-tool-image'></div>
                            <h2>40%</h2>
                        </div>
                        <p>Sketch</p>
                    </div>
                </div>
            </section>
            
            <section className="s4-home">
                <div className="s4-home-header">
                    <p>My Projects</p>
                    <p>
                    Here are some of my latest projects. Each one reflects my design process, attention to detail, and ability to build modern interfaces that solve real problems.
                    </p>
                </div>

                <div className="s4-home-project-cont">
                    {[...data] // clone so you don’t mutate original
                        .reverse()     // newest first
                        .slice(0, 4)   // take only 4
                        .map((project, index) => (
                        <div className="s4-home-project" key={index}>
                            <div 
                            className="s4-home-project-img" 
                            style={{ backgroundImage: `url(${project.image})` }}
                            ></div>

                            <div className="s4-home-project-desc">
                            <div className="s4-home-project-desc-tag">
                                {project.tags.map((tag, i) => (
                                <div key={i}>{tag}</div>
                                ))}
                            </div>

                            <div className='s4-home-project-title'>
                                <p>{project.name}</p>
                                <Link to={`/projects/${project.category}/${project.id}`}>
                                <div >
                                <FaArrowRight />
                                </div>
                                </Link>
                            </div>  
                            </div>
                        </div>
                        ))}
                    </div>
            </section>

            <section className="s5-home">
                <div className="s5-home-descrip">
                    <p className="s5-home-header">Hear What My Clients Have To Say</p>
                    <p className="s5-home-desc">
                    I take pride in delivering work that clients feel confident about. From communication to final delivery, I focus on clarity, quality, and meeting expectations. 
                    Here are a few words from people I’ve worked with and the experiences they had during our collaboration.
                    </p>
                </div>
                <br />

                <div className="s5-home-review-cont">
                    <div className="s5-home-review-r1">
                        <div className="s5-home-review-r1-cont">
                            {testimonal.map((r) => (
                                    r.id <= 3 ?
                                        <div className="s5-home-review">
                                            {starReview(r.ratings)}
                                            <br />
                                            <p className="s5-home-review-description">{r.review}</p>
                                            <br />
                                            <div className="s5-home-review-name-cont">
                                                <div className="s5-home-review-profile">
                                                    <img src={r.url} alt="" />
                                                    <div className="s5-home-review-name">
                                                        <p>{r.name}</p>
                                                        <i>{r.companyPosition}, {r.company}</i>
                                                    </div>
                                                </div>
                                                <LuQuote size='60'/>
                                            </div>
                                        </div>
                                    :
                                        <></>
                            ))
                            }
                        </div>
                        <div className="s5-home-review-r1-cont">
                            {testimonal.map((r) => (
                                    r.id <= 3 ?
                                        <div className="s5-home-review">
                                            {starReview(r.ratings)}
                                            <br />
                                            <p className="s5-home-review-description">{r.review}</p>
                                            <br />
                                            <div className="s5-home-review-name-cont">
                                                <div className="s5-home-review-profile">
                                                    <img src={r.url} alt="" />
                                                    <div className="s5-home-review-name">
                                                        <p>{r.name}</p>
                                                        <i>{r.companyPosition}, {r.company}</i>
                                                    </div>
                                                </div>
                                                <LuQuote size='60'/>
                                            </div>
                                        </div>
                                    :
                                        <></>
                            ))
                            }
                        </div>
                    </div>
                    <div className="s5-home-review-r2">
                        <div className="s5-home-review-r2-cont">
                            {testimonal.map((r) => (
                                    (r.id > 3 && r.id <= 6) ?
                                        <div className="s5-home-review">
                                            {starReview(r.ratings)}
                                            <br />
                                            <p className="s5-home-review-description">{r.review}</p>
                                            <br />
                                            <div className="s5-home-review-name-cont">
                                                <div className="s5-home-review-profile">
                                                    <img src={r.url} alt="" />
                                                    <div className="s5-home-review-name">
                                                        <p>{r.name}</p>
                                                        <i>{r.companyPosition}, {r.company}</i>
                                                    </div>
                                                </div>
                                                <LuQuote size='60'/>
                                            </div>
                                        </div>
                                    :
                                        <></>
                            ))
                            }
                        </div>
                        <div className="s5-home-review-r2-cont">
                            {testimonal.map((r) => (
                                    (r.id > 3 && r.id <= 6) ?
                                        <div className="s5-home-review">
                                            {starReview(r.ratings)}
                                            <br />
                                            <p className="s5-home-review-description">{r.review}</p>
                                            <br />
                                            <div className="s5-home-review-name-cont">
                                                <div className="s5-home-review-profile">
                                                    <img src={r.url} alt="" />
                                                    <div className="s5-home-review-name">
                                                        <p>{r.name}</p>
                                                        <i>{r.companyPosition}, {r.company}</i>
                                                    </div>
                                                </div>
                                                <LuQuote size='60'/>
                                            </div>
                                        </div>
                                    :
                                        <></>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </section>

            <section className='cta-home'>
                <div className="cta-text">
                    <p className="cta-text-title">Ready To Get Your Dream Website?</p>
                    <p className="cta-text-stitle">
                    Whether you need a website, a mobile app design, or a complete UI system, I’m ready to help bring your vision to life. 
                    Let’s build something modern, functional, and designed to impress your users from the very first click.
                    </p>

                    <Link to="contact"><button><p>Contact Me</p><div><FaArrowRight /></div></button></Link>
                </div>
                <div className="cta-image"></div>
            </section>

            <ScrollAnimation />

            <Footer />
        </>
    )
}

export default Home


