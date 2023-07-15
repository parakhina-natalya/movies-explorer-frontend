import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo.js';
import Button from '../Button/Button.js';
import Error from '../Error/Error.js';
import './Authorizations.css';

function Authorizations(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit();
  };

  return (
    <section className="authorizations">
      <div className="authorizations__container">
        <div className="authorizations__wrapp">
          <Logo />
          <h1 className="authorizations__title">{`${props.title}`}</h1>
          <form className="form" name={`${props.link}`} noValidate onSubmit={handleSubmit}>
            {props.children}
            <div className="authorizations__wrapp-button">
              <Error submitError={props.submitError} />
              <Button
                button={props.button}
                onClick={handleSubmit}
                disabled={props.disabled}>
              </Button>
              <div className="authorizations__sign">
                <p className="authorizations__text">{props.text} <Link to={props.link}
                  className="authorizations__link-text">{props.linkText}</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section >
  );
};

export default Authorizations;