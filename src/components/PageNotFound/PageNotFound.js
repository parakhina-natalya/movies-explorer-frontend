import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className="not-found">
      <div className="not-found__container">
        <div className="not-found__text-box">
          <span className="not-found__title">404</span>
          <span className="not-found__subtitle">Страница не найдена</span>
        </div>
        <button className="not-found__link_to-main" type="button" onClick={goBack}>Назад</button>
      </div>
    </section>
  );
}

export default PageNotFound;