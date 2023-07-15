import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getMovies } from '../utils/MoviesApi';

export const useMovies = () => {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [shortMovies, setShortMovies] = useState();
  const [savedMovies, setSavedMovies] = useState([]);
  const [state, setState] = useState({
    moviesIsLoading: false,
    movies: [],
    err: null,
  });

  useEffect(() => {
    if (!search || state.movies.length > 0) {
      return;
    };

    setState({
      ...state,
      moviesIsLoading: true,
    });

    const handleGetMovies = async () => {
      try {
        const movies = await getMovies();

        setState(state => ({
          ...state,
          movies,
        }));
      } catch (err) {
        setState(state => ({
          ...state,
          err: err.status,
        }));
      } finally {
        setState(state => ({
          ...state,
          moviesIsLoading: false,
        }));
      };
    };

    handleGetMovies();

  }, [search]);

  const filtredMovies = useMemo(() => {
    const saved = Boolean(location.pathname === '/saved-movies');
    const movies = saved ? savedMovies : state.movies;

    if (!search && !shortMovies && !saved) {
      return [];
    } else if (!search && !shortMovies && saved) {
      return movies;
    }

    const result = [];

    for (const movie of movies) {
      const { nameRU, nameEN, duration } = movie;
      const searched = (search && nameRU.includes(search.toLowerCase())) || (search && nameEN.includes(search.toLowerCase()));
      const short = shortMovies && duration < 40;

      if (search && shortMovies) {
        if (searched && short) {
          result.push(movie);
        };
      };

      if (search && !shortMovies) {
        if (searched) {
          result.push(movie);
        };
      };

      if (!search && shortMovies && saved) {
        if (short) {
          result.push(movie);
        };
      };
    };

    return result;
  }, [search, shortMovies, state.movies, location.pathname, savedMovies]);

  const notFound = (search || shortMovies) && filtredMovies.length === 0;

  const handleSetSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const handleSetShortMovies = useCallback((checked) => {
    setShortMovies(checked)
  }, []);

  return {
    moviesIsLoading: state.moviesIsLoading,
    filtredMovies,
    notFound,
    handleSetSearch,
    handleSetShortMovies,
    savedMovies,
    setSavedMovies,
    search,
    shortMovies
  };
};