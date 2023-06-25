import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {

  return (
    <section className="not-found">
      <div className="not-found__container">
        <div className="not-found__text-box">
          <span className="not-found__title">404</span>
          <span className="not-found__subtitle">Страница не найдена</span>
        </div>
        <Link className="not-found__link_to-main" to="/">Назад</Link>
      </div>
    </section >
  );
}

export default NotFound;