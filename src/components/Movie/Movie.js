import './Movie.css';

function Movie(props) {
  function movieDuration(time) {
    const mins = time % 60;
    const hours = (time - mins) / 60;
    const formatted = hours + 'ч ' + mins + 'м';
    return formatted;
  };

  function handleSubmitPost() {
    if (!props.checkLike(props.movie.id)) {
      props.handlePostMovie(props.movie);
    } else {
      handleSubmitDelete();
    };
  };

  function handleSubmitDelete() {
    let id = props.movie.movieId || props.movie.id;
    props.handleMovieDelete(id);
  };

  return (
    <li className="movie">
      <a className="movie__link" href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        {!props.save ? (
          <img className="movie__image" src={`https://api.nomoreparties.co/${props.movie.image.url}`} alt={props.movie.nameRU} />
        ) : (
          <img className="movie__image" src={props.movie.image} alt={props.movie.nameRU} />
        )}
      </a>
      <div className="movie__information">
        <div className="movie__info-box">
          <p className="movie__name"> {props.movie.nameRU} </p>
          {!props.save ? (
            <button className={`movie__button movie__button-like ${props.checkLike(props.movie.id) && "movie__button-like_active"}`}
              type="button" onClick={handleSubmitPost}></button>
          ) : (
            <button className="movie__button movie__button-del" type="button" onClick={handleSubmitDelete}></button>
          )}
        </div>

        <span className="movie__duration">{movieDuration(props.movie.duration)}</span>
      </div>
    </li>
  );
};

export default Movie;