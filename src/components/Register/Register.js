import Authorizations from '../../components/Authorizations/Authorizations';
import Input from '../Input/Input.js';

function Register(props) {

  return (
    <>
      <Authorizations
        title="Добро пожаловать!"
        text="Уже зарегистрированы?"
        link="/signin"
        linkText="Войти"
        button="Зарегистрироваться">
        <Input
          name="name"
          label="Имя"
          type="text"
          placeholder="Виталий"
          minLength="2"
          maxLength="30">
        </Input>
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
          placeholder="•••••••"
          minLength="7"
          maxLength="30">
        </Input>
      </Authorizations >
    </>
  );
}

export default Register;