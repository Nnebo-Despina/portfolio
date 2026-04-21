import React from 'react'
import '../styles/ProjectDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import database from '../../public/portfolioData/portfolio-db.json'

const ProjectDetails = () => {
    const data = database.projects;
    const { id } = useParams()
    const project = data.find(item => item.id === parseInt(id));
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate(-1)
    }
  return (
    <>
      <button className='back-btn-det' onClick={handleBackClick}>Back</button>

      <section className='s1-details'>
        <p className="s1-details-title">{project.name}</p>
        {
          project.figmaLink != "" ?
            <a href={`https://${project.figmaLink}`}>Figma Prototype Link</a>
          :
            <></>
        }
        {
          project.behanceLink != "" ?
            <a href={`https://${project.behanceLink}`}>Behance Link</a>
          :
            <></>
        }
        {
          project.websiteLink != "" ?
            <a href={`https://${project.websiteLink}`}>Website Link</a>
          :
            <></>
        }
      </section>
    </>
  )
}

export default ProjectDetails