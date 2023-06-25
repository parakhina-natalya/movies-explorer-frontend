import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Footer from '../Footer/Footer';
import Film from '../Film/Film';
import { initialCards } from '../../utils/constants'

function Movies(props) {

  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        onHamburger={props.onHamburger}
        isOpen={props.isOpen}
        onClose={props.onClose} />

      <main className="movies">
        <div className="movies__container">
          <Search />
          <section className="gallery" aria-label="Киногалерея">
            <ul className="films">
              {initialCards.map((film) => (
                <Film
                  key={film.movieId}
                  film={film}
                  save={props.save} />
              ))}
            </ul>
            <button className="gallery__button-more" type="button">Ещё</button>
          </section>
        </div>
      </main >
      <Footer />
    </>
  );
}

export default Movies;