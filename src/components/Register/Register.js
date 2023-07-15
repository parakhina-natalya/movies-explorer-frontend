import { useState, useEffect } from 'react';
import { REG_NAME, REG_EMAIL } from '../../utils/constants';
import Authorizations from '../../components/Authorizations/Authorizations';
import Input from '../Input/Input.js';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameError, setNameError] = useState('Введите ваше имя');
  const [emailError, setEmailError] = useState('Напишите ваш email');
  const [passwordError, setPasswordError] = useState('Введите пароль');
  const [formValid, setFormValid] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (nameError || emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    };
  }, [nameError, emailError, passwordError]);

  function handleChangeName(evt) {
    setName(evt.target.value);
    if (!evt.target.value) {
      setNameError('Введите ваше имя');
    } else if (evt.target.value.length < 2) {
      setNameError('Имя должно быть длиннее 2х символов');
    } else if (!REG_NAME.test(evt.target.value)) {
      setNameError('Введен некорректный символ');
    } else if (evt.target.value.length > 30) {
      setNameError('Имя не может быть длиннее 30 символов');
    } else {
      setNameError('');
    };
  };

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
      case 'name': setNameDirty(true);
        break;
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
    props.handleRegister({ name, password, email })
      .then(() => {
        submitError('');
      })
      .catch((err) => {
        if (err === 409) {
          setSubmitError('Пользователь с таким email уже существует');
        } else if (err === 400) {
          setSubmitError('При обновлении профиля произошла ошибка');
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
        title="Добро пожаловать!"
        text="Уже зарегистрированы?"
        link="/signin"
        linkText="Войти"
        button="Зарегистрироваться"
        onSubmit={handleSubmit}
        disabled={!formValid}
        submitError={submitError}
      >
        <Input
          classNameLabel="label"
          classNameInput="input"
          name="name"
          label="Имя"
          type="text"
          placeholder="Имя"
          value={name}
          disabled={disabled}
          onChange={handleChangeName}
          onInput={evt => handlerInput(evt)}
          error={(nameDirty && nameError) ? nameError : ''}>
        </Input>

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
          onInput={handlerInput}
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
};

export default Register;