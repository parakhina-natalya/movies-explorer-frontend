import './Search.css';

function Search() {

  return (
    <section className="search" aria-label="Поиск по сайту">
      <form className="search__from">
        <input className="search__input" name="search" placeholder="Фильм" type="search" />
        <button className="search__button" type="submit">Поиск</button>
      </form>
      <form className="toggle">
        <label className="checkbox">
          <input className="checkbox__input" type="checkbox" />
          <span className="checkbox__switch"></span>
        </label>
        <span className="toggle__text">Короткометражки</span>
      </form>
    </section>
  );
}

export default Search;