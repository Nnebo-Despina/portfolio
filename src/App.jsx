import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import './App.css'
import AboutMe from './pages/AboutMe'
import Services from './pages/Services'
import Projects from './pages/Projects'
import ContactMe from './pages/ContactMe'
import ProjectLayout from './layouts/ProjectLayout'
import ProjectUI from './pages/ProjectUI'
import ProjectWebUI from './pages/ProjectWebUI'
import ProjectWebDev from './pages/ProjectWebDev'
import ProjectDetails from './pages/ProjectDetails'
import MobileUILayout from './layouts/MobileUILayout'
import WebUILayout from './layouts/WebUILayout'
import WebDevLayout from './layouts/WebDevLayout'


const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<RootLayout />}>
                <Route index element={<Home />}/>
                <Route path='about-me' element={<AboutMe />}/>
                <Route path='services' element={<Services />}/>
                <Route path='projects' element={<ProjectLayout />}>
                    <Route index element={<Projects />} />
                    <Route path='mobile-ui' element={<MobileUILayout />}>
                        <Route index element={<ProjectUI />} />
                        <Route path=':id' element={<ProjectDetails />} />
                    </Route>
                    <Route path='web-ui' element={<WebUILayout />}>
                        <Route index element={<ProjectWebUI />} />
                        <Route path=':id' element={<ProjectDetails />} />
                    </Route>

                    <Route path='web-dev' element={<WebDevLayout />}>
                        <Route index element={<ProjectWebDev />} />
                        <Route path=':id' element={<ProjectDetails />} />
                    </Route>
                </Route>
                <Route path='contact' element={<ContactMe />}/>
            </Route>
        )
        )

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App