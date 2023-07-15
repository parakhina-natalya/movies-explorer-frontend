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
            <p className="about-me__history">
              Привет! 
              Я начинающая волшебница. Мне нравится творить магию с помощью кода. 
              Я с азартом осваиваю новые заклинания и ловлю кайф, когда по моему слову на экране происходит магия, 
              когда пиксели сходятся с пикселями, и все элементы оживают.
              А еще я вожу мотоцикл, много читаю и хочу жить вдали от городской суеты. 
              </p>
            <a className="about-me__link" href="https://github.com/parakhina-natalya" target="_blank" rel="noreferrer">Github</a>
          </div>
          <img className="about-me__photo" src={photo} alt="Наталья" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;