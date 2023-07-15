import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Footer from '../Footer/Footer';
import Movie from '../Movie/Movie';
import './Movies.css';

function Movies(props) {
  const [add, setAdd] = useState(0);
  const [addClose, setAddClose] = useState(true);
  const [width, setWidth] = useState(0);
  const [limit, setLimit] = useState(0);

  function addMovie() {
    setAdd(() => add + 1);
  };

  useEffect(() => {
    if (!props.save) {
      window.addEventListener('resize', handleResize);
    } return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [props.save]);

  function handleResize() {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (!props.save) {
      let counter;
      let minMovi;
      let maxMovi;
      let width = window.innerWidth;

      setAddClose(false);

      if (width > 770) {
        minMovi = 12;
        counter = (add * 3);
      } else if (width > 480) {
        minMovi = 8;
        counter = (add * 2);
      } else {
        minMovi = 5;
        counter = (add * 2);
      };

      maxMovi = (minMovi + counter);
      if (maxMovi >= props.arrMovies.length) {
        setLimit(props.arrMovies.length);
        setAddClose(true);
      } else {
        setLimit(maxMovi);
        setAddClose(false);
      };

      setLimit(maxMovi);
    };
  }, [width, add, props.save, props.search, props.shortMovies]);

  useEffect(() => {
    if (props.arrMovies.length && limit < props.arrMovies.length) {
      setAddClose(false);
    } else if (!props.arrMovies.length) {
      setAddClose(true);
    };
  }, [props.arrMovies]);

  useEffect(() => {
    if (!props.save) {
      setAdd(0);
    };
  }, [props.search, props.shortMovies]);

  return (
    <>
      <Header loggedIn={props.loggedIn} onHamburger={props.onHamburger} isOpen={props.isOpen} onClose={props.onClose} />
      <main className="movies">
        <div className="movies__container">
          <Search
            onSearchMovies={props.onSearch}
            onChangeFilter={props.onChangeFilter}
            notFound={props.notFound}
            save={props.save}
            search={props.search}
            shortMovies={props.shortMovies}
            setIsLoading={props.setIsLoading}
          />
          <section className="gallery" aria-label="Киногалерея">
            <span className="gallery__erorr">{props.movieError}</span>
            <ul className="movies-list">
              {props.arrMovies.slice(0, !props.save ? limit : props.arrMovies.length).map((movie) => (
                <Movie
                  key={movie.id || movie._id}
                  movie={movie}
                  save={props.save}
                  checkLike={props.checkLike}
                  handlePostMovie={props.handlePostMovie}
                  handleMovieDelete={props.handleMovieDelete}
                />
              ))}
            </ul>
            {(!props.save && !addClose) &&
              <button className="gallery__button-more" type="button" onClick={addMovie}>Ещё</button>
            }
          </section>
        </div>
      </main >
      <Footer />
    </>
  );
};

export default Movies;