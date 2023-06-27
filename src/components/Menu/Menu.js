import './Menu.css';
import Navigation from '../Navigation/Navigation';

function Menu(props) {

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__button-close" type="button"
          onClick={props.onClose}></button>
        <Navigation className="popup" onClose={props.onClose}></Navigation>
      </div>
    </div>
  );
}

export default Menu;