import React from 'react'
import NavBar from '../components/NavBar'
import '../styles/Projects.css'
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import database from '../../public/portfolioData/portfolio-db.json'


const Projects = () => {
        const data = database.projects;
        let dataAppUI = data.filter(data => data.category == "mobile-ui")
        let dataWebUI = data.filter(data => data.category == "web-ui")
        let dataWebDev = data.filter(data => data.category == "web-dev")

  return (
    <>
        <NavBar />
        <section className="s1-project">
            <div className="s1-project-title">
                <p>My Projects</p>
                <p>A selection of my recent design and development work, ranging from mobile interfaces to full website builds. Each project focuses on usability, clean visuals, and solving real user needs through thoughtful design.</p>
            </div>
            <div className="s1-project-cont">
                <Link to='mobile-ui'>
                    <div className="s1-project-desc">
                        <p className="s1-project-desc-title">Mobile Design</p>
                        <div className="s1-project-img-cont">
                            <div className="s1-project-placeholder"></div>
                            <div className="s1-project-placeholder"></div>
                            <div className="s1-project-img">
                                <img src={dataAppUI.at(-1).image} alt="" />
                                <div className='s1-project-img-div'><BsArrowRight /></div>
                            </div>
                        </div>
                        
                    </div>
                </Link>
                <Link to='web-ui'>
                <div className="s1-project-desc">
                    <p className="s1-project-desc-title">Website Design</p>
                    <div className="s1-project-img-cont">
                        <div className="s1-project-placeholder"></div>
                        <div className="s1-project-placeholder"></div>
                        <div className="s1-project-img">
                            <img src={dataWebUI.at(-1).image} alt="" />
                            <div className='s1-project-img-div'><BsArrowRight /></div>
                        </div>
                    </div>
                </div>
                </Link>
                <Link to='web-dev'>
                <div className="s1-project-desc">
                    <p className="s1-project-desc-title">Website Development</p>
                    <div className="s1-project-img-cont">
                        <div className="s1-project-placeholder"></div>
                        <div className="s1-project-placeholder"></div>
                        <div className="s1-project-img">
                            <img src={dataWebDev.at(-1).image} alt="" />
                            <div className='s1-project-img-div'><BsArrowRight /></div>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
        </section>
    </>
  )
}

export default Projects