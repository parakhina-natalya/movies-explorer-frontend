import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Logo.css';

function Logo() {

  return (
    <div className="logo">
      <Link to="/"><img className="logo__img" src={logo} alt="логотип проекта по поиску фильмов" /></Link>
    </div>
  );
}

export default Logo;