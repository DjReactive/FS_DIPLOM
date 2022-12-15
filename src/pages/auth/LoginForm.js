import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import PreLoader from '../../components/global/PreLoader'
import { AuthContext } from '../../control/lib/AuthProvider'
import { useStore } from '../../control/store'

const LoginForm = observer(() => {
  const auth = useStore(store => store.userStore);
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);
  const [form, setForm] = useState(null);
  const submit = useRef(null);
  const handleChange = ({target}) => setForm(prev => ({ ...prev, [target.name]: target.value }));

  useEffect(() => {
    if (auth.getToken()) {
      navigate('/');
    }
  }, [auth.update, auth, navigate]);

  return (
        <form className="login__form" onSubmit={e => onLogin(e, form)} acceptCharset="utf-8">
          <label className="login__label" htmlFor="mail">
            E-mail
            <input className="login__input" type="email"
              onChange={handleChange}
              autoComplete="email" placeholder="example@domain.xyz" name="email" required />
          </label>
          <label className="login__label" htmlFor="pwd">
            Пароль
            <input className="login__input" type="password"
              onChange={handleChange}
              autoComplete="current-password" placeholder="" name="password" required />
          </label>
          <div className="text-center">
            { auth.loading ?
              <PreLoader load={true} /> :
              <input type="submit" ref={submit} className="login__button"disabled={auth.loading} />
            }
          </div>
        </form>
  );
});

export default LoginForm;
