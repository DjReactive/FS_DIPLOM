import { observer } from 'mobx-react-lite';
import LoginForm from './LoginForm'

const Authorize = observer(() => {
  return (
    <section className="login">
      <header className="login__header">
        <h2 className="login__title">Авторизация</h2>
      </header>
      <div className="login__wrapper">
        <LoginForm />
      </div>
    </section>
  );
});

export default Authorize;
