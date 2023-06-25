import Authorizations from '../../components/Authorizations/Authorizations';
import Input from '../Input/Input.js';

function Login(props) {

  return (
    <>
      <Authorizations
        title="Рады видеть!"
        text="Ещё не зарегистрированы?"
        link="/signup"
        linkText="Регистрация"
        button="Войти"
        onClick={props.onloggedIn}>
        <Input
          name="email"
          label="E-mail"
          type="email"
          placeholder="pochta@yandex.ru"
          minLength="2"
          maxLength="30">
        </Input>
        <Input
          name="password"
          label="Пароль"
          type="password"
          placeholder="Пароль"
          minLength="7"
          maxLength="30">
        </Input>
      </Authorizations >
    </>
  );
}

export default Login;