import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useMovies } from '../../hooks/useMovies';
import ProtectedRouteElement from '../../components/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import Landing from '../Landing/Landing.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import './App.css';
import {
  register, authorize, getUserInfo, updateUserInfo,
  getSavedMovies, postMovie, deleteMovie
} from '../../utils/MainApi';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const { handleSetSearch,
    handleSetShortMovies,
    filtredMovies,
    notFound,
    savedMovies,
    setSavedMovies,
    search,
    shortMovies,
    moviesIsLoading
  } = useMovies();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [jwtErrorStatus, setJwtErrorStatus] = useState('');
  const [movieError, setMovieError] = useState('');

  function checkLike(id) {
    return savedMovies.some((movie) => movie.movieId === id);
  };

  function handleHamburgerClick() {
    setIsHamburgerOpen(true);
  };

  function closeHamburger() {
    setIsHamburgerOpen(false);
  };

  useEffect(() => {
    setIsLoading(moviesIsLoading);
  }, [moviesIsLoading]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoading(true);
    if (token) {
      getUserInfo(token)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
            navigate(location.pathname, { replace: true });
            handleSavedMovies();
          };
        })
        .catch((err) => {
          console.log(err);
          setJwtErrorStatus(err);
          handleSignOut();
          navigate('/signin', { replace: true });
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
    else {
      setLoggedIn(false);
      setIsLoading(false);
    }
  }, [loggedIn]);

  function handleSavedMovies() {
    setIsLoading(true);
    getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(err.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleMovieDelete(movieDelId) {
    setMovieError('');
    const deletedMovie = savedMovies.find((movie) => movie.movieId === movieDelId);
    if (deletedMovie) {
      return deleteMovie(deletedMovie._id)
        .then(() => {
          setSavedMovies((state) => state.filter((movie) => movie._id !== deletedMovie._id));
        })
        .catch((err) => {
          if (err === 404) {
            setMovieError('Фильм не найден');
          } else if (err === 500) {
            setMovieError('На сервере произошла ошибка.');
          }
        });
    };
  };

  function handlePostMovie(movie) {
    setMovieError('');
    const likedMovie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id
    }
    return postMovie(likedMovie)
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((err) => {
        if (err === 404) {
          setMovieError('Фильм не найден');
        } else if (err === 500) {
          setMovieError('На сервере произошла ошибка.');
        }
      });
  };

  function handleUpdateUserInfo({ name, email }) {
    setIsLoading(true);
    return updateUserInfo({ name, email })
      .then((currentUser) => {
        if (currentUser)
          setCurrentUser(currentUser);
      })
  };

  function handleAuthorize({ password, email }) {
    setIsLoading(true);
    return authorize({ password, email })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
  };

  function handleRegister({ name, password, email }) {
    setIsLoading(true);
    return register({ name, password, email })
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          handleAuthorize({ email, password });
          navigate('/movies', { replace: true });
        }
      })
  };

  function handleSignOut() {
    setLoggedIn(false);
    navigate('/', { replace: true });
    localStorage.clear();
  };

  return (<CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Routes>
        <Route path="/signup"
          element={<Register
            handleRegister={handleRegister}
            setIsLoading={setIsLoading}
          />} />

        <Route path="/signin"
          element={<Login
            handleAuthorize={handleAuthorize}
            setIsLoading={setIsLoading}
            jwtErrorStatus={jwtErrorStatus}
            loggedIn={loggedIn}
          />} />

        <Route path="/"
          element={<Landing
            loggedIn={loggedIn}
            onHamburger={handleHamburgerClick}
            isOpen={isHamburgerOpen}
            onClose={closeHamburger}
          />} />

        <Route path="/movies" element={<ProtectedRouteElement
          element={Movies}
          loggedIn={loggedIn}
          onHamburger={handleHamburgerClick}
          isOpen={isHamburgerOpen}
          onClose={closeHamburger}
          checkLike={checkLike}
          movieError={movieError}
          setIsLoading={setIsLoading}
          onSearch={handleSetSearch}
          onChangeFilter={handleSetShortMovies}
          arrMovies={filtredMovies}
          handlePostMovie={handlePostMovie}
          handleMovieDelete={handleMovieDelete}
          notFound={notFound}
          search={search}
          shortMovies={shortMovies}
        />} />

        <Route path="/saved-movies" element={<ProtectedRouteElement
          element={Movies}
          loggedIn={loggedIn}
          onHamburger={handleHamburgerClick}
          isOpen={isHamburgerOpen}
          onClose={closeHamburger}
          setIsLoading={setIsLoading}
          onSearch={handleSetSearch}
          onChangeFilter={handleSetShortMovies}
          arrMovies={filtredMovies}
          handleMovieDelete={handleMovieDelete}
          notFound={notFound}
          movieError={movieError}
          save={true}
          search={search}
          shortMovies={shortMovies} />} />

        <Route path="/profile" element={<ProtectedRouteElement
          element={Profile}
          loggedIn={loggedIn}
          onHamburger={handleHamburgerClick}
          isOpen={isHamburgerOpen}
          onClose={closeHamburger}
          onSignOut={handleSignOut}
          updateUserInfo={handleUpdateUserInfo}
          setIsLoading={setIsLoading}
        />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Preloader
        isLoading={isLoading}
      />
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;