import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../control/lib/AuthProvider'
import { useStore } from '../../control/store'
import API from '../../control/API'

const LoginSection = observer(() => {
  const auth = useStore(store => store.userStore);
  const { onLogout } = useContext(AuthContext);
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const token = auth.getToken();
  const handleLogout = e => onLogout(e, user, token);

  useEffect(() => {
    const userData = auth.getUser();

    if (userData) API.CheckAuthUser();
    setUser(userData);

  }, [auth.update]);

  return (
    <section className="login-section">
        { user ?
          <div className="login__logout">
            <p>Привет, {user.name}! <Link to="/admin">Панель</Link></p>
            <button className="acceptin-button" onClick={handleLogout}>Выход</button>
          </div>
          :
          <div className="login__auth">
            <button className="acceptin-button" onClick={() => navigate('/login')}>Войти</button>
          </div>
        }
    </section>
  );
});

export default LoginSection;
