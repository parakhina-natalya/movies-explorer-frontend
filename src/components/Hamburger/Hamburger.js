import './Hamburger.css';
import Navigation from '../Navigation/Navigation';

function Hamburger(props) {

  return (
    <div className={`hamburger ${props.isOpen ? "hamburger_opened" : ""}`}>
      <div className="hamburger__container">
        <button className="hamburger__button-close" type="button"
          onClick={props.onClose}></button>
        <Navigation className="hamburger" onClose={props.onClose}></Navigation>
      </div>
    </div>
  );
}

export default Hamburger;