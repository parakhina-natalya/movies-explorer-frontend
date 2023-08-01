import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Error from '../Error/Error';
import Button from '../Button/Button';
import Input from '../Input/Input.js';
import { REG_NAME, REG_EMAIL } from '../../utils/constants';
import './Profile.css';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [nameError, setNameError] = useState('Введите новое имя');
  const [emailError, setEmailError] = useState('Напишите новый email');
  const [formValid, setFormValid] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleDisabled() {
    setDisabled(false);
    setIsEditOpen(true);
    setNameDirty(true);
    setEmailDirty(true);
  };

  useEffect(() => {
    if (nameError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    };
  }, [nameError, emailError]);

  useEffect(() => {
    if (name === currentUser.name
      && nameError === 'Введите новое имя' && email !== currentUser.email && !emailError) {
      setNameError('');
      setEmailError('');
    } else if (name !== currentUser.name && email === currentUser.email && emailError === 'Напишите новый email' && !nameError) {
      setNameError('');
      setEmailError('');
    } else if (name === currentUser.name && email === currentUser.email) {
      setNameError('Введите новое имя');
      setEmailError('Напишите новый email');
    };
  }, [name, email, nameError, emailError, currentUser.name, currentUser.email]);

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

  const handlerInput = (evt) => {
    switch (evt.target.name) {
      case 'name': setNameDirty(true);
        break;
      case 'email': setEmailDirty(true);
        break;
      // no default
    };
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.updateUserInfo({ name, email })
      .then(() => {
        setNameDirty(false);
        setEmailDirty(false);
        setSubmitError('✔️');
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
        props.setIsLoading(false);
      });
  };

  return (
    <>
      <Header loggedIn={props.loggedIn}
        onHamburger={props.onHamburger}
        isOpen={props.isOpen}
        onClose={props.onClose} />

      <section className="profile">
        <div className="profile__body">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <Input
              classNameLabel="profile__label"
              classNameInput="profile__input profile__input_el_name"
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
            <span className="profile__line"></span>

            <Input
              classNameLabel="profile__label profile__label_el_email"
              classNameInput="profile__input profile__input_el_email"
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
          </form>
        </div>

        <div className="profile__footer">
          {!isEditOpen ? (
            <div className="profile__links">
              <span className="profile__link profile__link_el_edit" onClick={handleDisabled}>Редактировать</span>
              <span className="profile__link profile__link_el_exit" onClick={props.onSignOut}>Выйти из аккаунта</span>
            </div>
          ) : (
            <div className="profile__button">
              <Error
                submitError={submitError} />
              <Button
                button="Сохранить"
                onClick={handleSubmit}
                disabled={!formValid}>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;