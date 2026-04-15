import React from 'react'
import '../styles/ProjectUI.css'
import NavBar from '../components/NavBar'
import { FaArrowRight } from 'react-icons/fa'
import Footer from '../components/Footer'
import database from '/portfolioData/portfolio-db.json'
import { Link, useNavigate } from 'react-router-dom'


const ProjectWebUI = () => {
        const data = database.projects;
        let dataWebUI = data.filter(data => data.category == "web-ui")
        const navigate = useNavigate()

        const handleBackClick = () => {
            navigate(-1)
        }
  
  return (
    <>
      <NavBar />

      <section className="s1-project-ui">
        <button className='back-btn-uui' onClick={handleBackClick}>Back</button>

          <div className="s1-project-ui-header">
              <p>Website/WebApp UI/UX Designs</p>
              <p>Here are some of my recent web UI/UX designs, crafted to improve usability, visual clarity, and overall user experience across modern web platforms.</p>
          </div>
          <div className="s1-project-ui-project-ui-cont">
              {
                  dataWebUI.map((project) => (
                      <div className="s1-project-ui-one">
                          <div className="s1-project-ui-image" style={{ backgroundImage: `url("${project.image}")`}}>
                              <div className="s1-project-ui-desc">
                                  <div>
                                      <div className="project-ui-desc-tag">
                                          {project.tags.map((tag, i) => (
                                                <div key={i}>{tag}</div>
                                            ))}
                                      </div>
                                      <p>{project.name}</p>
                                  </div>
                                  <Link to={`${project.id}`}><button><p>View Details</p><div className='s1-header-desc-svg'><FaArrowRight /></div></button></Link>
                              </div>
                          </div>
                      </div>
                  ))
                  
              }
          </div>
      </section>
      
      <Footer />
    </>
  )
}

export default ProjectWebUI