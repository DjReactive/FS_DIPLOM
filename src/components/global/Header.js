import Helmet from 'react-helmet';
import LoginSection from './LoginSection'
import { Link } from 'react-router-dom'
import { WEBSITE_NAME } from '../../control/constants';

export default function Header({children, isAdmin}) {
  return (
    <div className="header-section">
      <Helmet>
        <title>{WEBSITE_NAME}{children && (" - " + children)}</title>
      </Helmet>
      <header className="page-header">
        <Link to="/"><h1 className="page-header__title">Идём<span>в</span>кино</h1></Link>
        { isAdmin && <span className="page-header__subtitle">Администраторррская</span> }
      </header>
      <LoginSection />
    </div>
  )
}
