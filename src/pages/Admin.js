import '../resources/admin/css/style.css';
import '../resources/admin/css/normalize.css';
import { useEffect } from 'react'
import EditHall from '../components/admin/EditHall';
import ConfigHall from '../components/admin/ConfigHall';
import ConfigPrice from '../components/admin/ConfigPrice';
import ConfigSession from '../components/admin/ConfigSession';
import Ready from '../components/admin/Ready';
import PopupWrapper from '../components/admin/popup/';
import accordeon from '../resources/admin/accordeon'

export default function Admin() {
  useEffect(() => accordeon(), []);
  return (
      <main className="conf-steps">
        <EditHall/>
        <ConfigHall/>
        <ConfigPrice/>
        <ConfigSession/>
        <Ready/>
        <PopupWrapper/>
      </main>
  )
}
