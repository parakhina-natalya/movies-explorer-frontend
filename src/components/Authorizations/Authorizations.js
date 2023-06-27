import Logo from '../Logo/Logo.js';
import Button from '../Button/Button.js';
import Error from '../Error/Error.js';
import { Link } from 'react-router-dom';
import './Authorizations.css';

function Authorizations(props) {

  function submit(evt) {
    evt.preventDefault();
    props.onClick();
  };

  return (
    <section className="authorizations">
      <div className="authorizations__container">
        <div className="authorizations__wrapp">
          <Logo />
          <h1 className="authorizations__title">{`${props.title}`}</h1>
          <form className="form" novalidate>
            {props.children}
          </form>
        </div>
        <div className="authorizations__wrapp-button">
          <Error />
          <Button
            button={props.button}
            onClick={submit}>
          </Button>
          <div className="authorizations__sign">
            <p className="authorizations__text">{props.text} <Link to={props.link}
              className="authorizations__link-text">{props.linkText}</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Authorizations;