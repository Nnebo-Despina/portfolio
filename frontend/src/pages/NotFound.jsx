import { Link } from 'react-router-dom'
import '../styles/pages.css'
import Page from '../components/Page'
import { Arrow } from '../components/Icons'

export default function NotFound() {
  return (
    <Page title="Page not found">
      <section className="panel nf">
        <div className="wrap">
          <h1>404</h1>
          <p className="lede" style={{ margin: '12px auto 28px' }}>This page doesn’t exist. Try the home page or my work.</p>
          <Link to="/" className="btn">Back home <span className="ico"><Arrow size={16} /></span></Link>
        </div>
      </section>
    </Page>
  )
}
