import Authorizations from '../../components/Authorizations/Authorizations';
import Input from '../Input/Input.js';
import { useState, useEffect } from 'react';
import { REG_EMAIL } from '../../utils/constants';

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Напишите ваш email');
  const [passwordError, setPasswordError] = useState('Введите пароль');
  const [formValid, setFormValid] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  useEffect(() => {
    if (props.jwtErrorStatus) {
      if (props.jwtErrorStatus === 401) {
        setSubmitError('Вход не выполнен. При авторизации произошла ошибка.');
      } else if (props.jwtErrorStatus === 500) {
        setSubmitError('На сервере произошла ошибка.');
      };
    };
  }, [props.jwtErrorStatus]);

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
    if (!evt.target.value) {
      setEmailError('Напишите ваш email');
    } else if (!REG_EMAIL.test(String(evt.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
    } else {
      setEmailError('');
    };
  };

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
    if (!evt.target.value) {
      setPasswordError('Введите пароль');
    } else if (evt.target.value.length < 7) {
      setPasswordError('Пароль должен быть длиннее 7 символов');
    } else {
      setPasswordError('');
    };
  };

  const handlerInput = (evt) => {
    switch (evt.target.name) {
      case 'email': setEmailDirty(true);
        break;
      case 'password': setPasswordDirty(true);
        break;
      // no default
    };
  };

  const handleSubmit = () => {
    setDisabled(true);
    setFormValid(false);
    props.handleAuthorize({ password, email })
      .then(() => {
        submitError('');
      })
      .catch((err) => {
        if (err === 401) {
          setSubmitError('Вы ввели неправильный логин или пароль.');
        } else if (err === 400) {
          setSubmitError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
        } else if (err === 403) {
          setSubmitError('При авторизации произошла ошибка. Переданный токен некорректен.');
        } else if (err === 500) {
          setSubmitError('На сервере произошла ошибка.');
        };
      })
      .finally(() => {
        setFormValid(true);
        setDisabled(false);
        props.setIsLoading(false);
      });
  };

  return (
    <>
      <Authorizations
        title="Рады видеть!"
        text="Ещё не зарегистрированы?"
        link="/signup"
        linkText="Регистрация"
        button="Войти"
        onSubmit={handleSubmit}
        disabled={!formValid}
        submitError={submitError}
      >
        <Input
          classNameLabel="label"
          classNameInput="input"
          name="email"
          label="E-mail"
          type="email"
          placeholder="Почта"
          value={email}
          disabled={disabled}
          onChange={handleChangeEmail}
          onInput={evt => handlerInput(evt)}
          error={(emailDirty && emailError) ? emailError : ''}>
        </Input>

        <Input
          classNameLabel="label"
          classNameInput="input"
          name="password"
          label="Пароль"
          type="password"
          placeholder="Пароль"
          value={password}
          disabled={disabled}
          onChange={handleChangePassword}
          onInput={evt => handlerInput(evt)}
          error={(passwordDirty && passwordError) ? passwordError : ''}>
        </Input>
      </Authorizations >
    </>
  );
}

export default Login;