import Header from '../Header/Header';
import Error from '../Error/Error';
import Button from '../Button/Button';

import './Profile.css';

function Profile(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn}
        onHamburger={props.onHamburger}
        isOpen={props.isOpen}
        onClose={props.onClose} />
      <section className="profile">
        <div className="profile__body">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form">
            <label className="profile__label" htmlFor="name-input">Имя
              <input className="profile__input profile__input_el_name" type="text" id="name-input"
                name="name" placeholder="Виталий" required minLength="2" maxLength="40" /></label>
            <span className="profile__error profile__error_el_name"></span>

            <label className="profile__label profile__label_el_email" htmlFor="email-input">E-mail
              <input className="profile__input profile__input_el_email" type="email" id="email-input" name="email"
                placeholder="pochta@yandex.ru" required minLength="2" maxLength="40" />
            </label>
            <span className="profile__error"></span>
          </form>
        </div>

        <div className="profile__footer">
          {!props.isEditOpen ? (
            <div className="profile__links">
              <span className="profile__link profile__link_el_edit" onClick={props.onEdit}>Редактировать</span>
              <span className="profile__link profile__link_el_exit" onClick={props.onSignOut}>Выйти из аккаунта</span>
            </div>
          ) : (
            <div className="profile__button">
              <Error />
              <Button
                button="Сохранить">
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Profile;