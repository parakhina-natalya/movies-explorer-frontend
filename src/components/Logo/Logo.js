import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Logo.css';

function Logo() {
  return (
    <Link to="/"><img className="logo" src={logo} alt="логотип проекта по поиску фильмов" /></Link>
  );
}

export default Logo;