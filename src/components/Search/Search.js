import { useEffect, useState } from 'react';
import './Search.css';

function Search(props) {
  const [search, setSearch] = useState('');
  const [nameError, setNameError] = useState('');
  const [checked, setChecked] = useState(false);

  function handleChangeSearch(evt) {
    setSearch(evt.target.value);
  };

  function handleChangeChecked(evt) {
    if (props.save) {
      localStorage.setItem('savedChecked', JSON.stringify(!checked));
    } else {
      localStorage.setItem('checked', JSON.stringify(!checked));
    };
    setChecked(!checked);
    props.onChangeFilter(evt);
  };

  useEffect(() => {
    props.onChangeFilter(checked);
  }, [checked]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (search === '' && !props.save) {
      return setNameError('Нужно ввести ключевое слово');
    };
    setNameError('');
    if (props.save) {
      localStorage.setItem('savedValue', JSON.stringify(search));
    } else {
      localStorage.setItem('value', JSON.stringify(search));
    }
    props.onSearchMovies(search);
  };

  useEffect(() => {
    setNameError('');
    if (props.save) {
      setChecked(JSON.parse(localStorage.getItem('savedChecked')) || false);
      setSearch(JSON.parse(localStorage.getItem('savedValue')) || '');
      props.onSearchMovies(JSON.parse(localStorage.getItem('savedValue')) || '');
    } else {
      setChecked(JSON.parse(localStorage.getItem('checked')) || false);
      setSearch(JSON.parse(localStorage.getItem('value')) || '');
      props.onSearchMovies(JSON.parse(localStorage.getItem('value')) || '');
    };
  }, [props.save]);

  useEffect(() => {
    if (props.notFound && !nameError) {
      setNameError('Ничего не найдено');
    } else if (!props.notFound && nameError && nameError !== 'Нужно ввести ключевое слово') {
      setNameError('');
    };
  }, [props.notFound, props.search, props.shortMovies, nameError]);

  return (
    <section className="search" aria-label="Поиск по сайту">
      <form className="search__from" >
        <input className="search__input" name="search" placeholder="Фильм" type="search"
          value={search} onChange={handleChangeSearch} />
        <button className="search__button" type="submit" onClick={handleSubmit}>Поиск</button>
      </form>
      <span className="search__error">{nameError}</span>
      <form className="toggle">
        <label className="checkbox">
          <input className="checkbox__input" type="checkbox"
            checked={checked} onChange={handleChangeChecked} />
          <span className="checkbox__switch"></span>
        </label>
        <span className="toggle__text">Короткометражки</span>
      </form>
    </section>
  );
};

export default Search;