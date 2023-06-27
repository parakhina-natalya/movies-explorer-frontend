import { useState } from 'react';

import './Film.css';

function Film(props) {
  const [Like, setLike] = useState(false);
  const toggleClassLike = () => {
    setLike(!Like);
  };

  function movieDuration(time) {
    const mins = time % 60;
    const hours = (time - mins) / 60;
    const formatted = hours + 'ч ' + mins + 'м';
    return formatted;
  }

  return (
    <li className="film">
      <img className="film__image" src={props.film.image} alt={props.film.nameRU} />

      <div className="film__information">
        <div className="film__info-box">
          <p className="film__name"> {props.film.nameRU} </p>
          {!props.save ? (
            <button className={`film__button film__button-like ${Like && "film__button-like_active"}`}
              onClick={toggleClassLike} type="button"></button>
          ) : (
            <button className="film__button film__button-del" type="button"></button>
          )}
        </div>

        <span className="film__duration">{movieDuration(props.film.duration)}</span>
      </div>
    </li>
  );
}


export default Film;

