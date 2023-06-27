import React from 'react';
import './AboutMe.css'
import photo from '../../images/avatar.jpg';


function AboutMe() {

  return (
    <section className="about-me" id="about-me">
      <div className="about-me__container">
        <h2 className="about-me__section-name">Студент</h2>
        <div className="about-me__box">
          <div className="about-me__text-box">
            <h3 className="about-me__name">Наталья</h3>
            <p className="about-me__description">Фронтенд-разработчик, 33 года</p>
            <p className="about-me__history">Я родился и живу в Саратове,
              закончил факультет экономики СГУ. У меня есть жена и дочь.
              Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
              С 2015 года работал в компании «СКБ Контур». После того,
              как прошёл курс по веб-разработке, начал заниматься фриланс-заказами
              и ушёл с постоянной работы.</p>
            <a className="about-me__link" href="https://github.com/parakhina-natalya" target="_blank" rel="noreferrer">Github</a>
          </div>
          <img className="about-me__photo" src={photo} alt="Наталья" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;