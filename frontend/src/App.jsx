import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteProvider } from './lib/site'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// The admin area is a separate chunk: visitors never download it.
const Admin = lazy(() => import('./admin/AdminApp'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Suspense fallback={null}><Admin /></Suspense>} />
        <Route path="*" element={<SiteProvider><PublicRoutes /></SiteProvider>} />
      </Routes>
    </BrowserRouter>
  )
}

function PublicRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="about-me" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/:category" element={<Projects />} />
      <Route path="projects/:category/:id" element={<ProjectDetail />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
