import React from "react";
import PropTypes from "prop-types";
import {ALL_GENRES, MAX_GENRES} from "../../common/consts";
import films from "../../common/mock/films";

export const getGenres = () => {
  return films.reduce((filmGenres, film) => {
    if (!filmGenres.includes(film.genre)) {
      filmGenres.push(film.genre);
    }
    return filmGenres;
  }, [ALL_GENRES]);
};

const GenreList = (props) => {
  const {activeGenre, onFilterClick} = props;

  return (
    <ul className="catalog__genres-list">
      {getGenres().slice(0, MAX_GENRES).map((genre, index) => {
        return (
          <li key={`${genre}-${index}`}
            className={`catalog__genres-item ${genre === activeGenre ? `catalog__genres-item--active` : ``}`}>
            <a href="#" className="catalog__genres-link"
              onClick={(evt) => {
                evt.preventDefault();
                onFilterClick(genre);
              }}>{genre}</a>
          </li>
        );
      })}
    </ul>
  );
};

GenreList.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired
};

export default GenreList;
