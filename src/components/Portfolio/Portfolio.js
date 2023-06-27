import './Portfolio.css'
import arrow from '../../images/arrow.svg'

function Portfolio() {

  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__projects">
          <li className="portfolio__project">
            <a href="https://github.com/parakhina-natalya/how-to-learn" className="portfolio__project-link"
              target="_blank" rel="noreferrer">Статичный сайт
              <img className="portfolio__icon" src={arrow} alt="ссылка на проект" />
            </a>
          </li>
          <li className="portfolio__project">
            <a href="https://parakhina-natalya.github.io/russian-travel-by-napar/" className="portfolio__project-link"
              target="_blank" rel="noreferrer">Адаптивный сайт
              <img className="portfolio__icon" src={arrow} alt="ссылка на проект" />
            </a>
          </li>
          <li className="portfolio__project">
            <a href="https://mesto.parakhina.nomoredomains.monster" className="portfolio__project-link"
              target="_blank" rel="noreferrer">Одностраничное приложение
              <img className="portfolio__icon" src={arrow} alt="ссылка на проект" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;