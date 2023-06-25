import './AboutProject.css';

function AboutProject() {

  return (
    <section className="about-project" id="about-project">
      <div className="about-project__container">
        <h2 className="about-project__section-name">О проекте</h2>
        <div className="about-project__descriptions">
          <div className="about-project__description">
            <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__description">
            <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__weeks">
          <div className="about-project__week about-project__week-one">1 неделя</div>
          <div className="about-project__week about-project__week-four">4 недели</div>
          <span className="about-project__text about-project__text-backend">Back-end</span>
          <span className="about-project__text about-project__text-fronted">Front-end</span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;