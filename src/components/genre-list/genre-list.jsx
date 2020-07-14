import React from "react";
import PropTypes from "prop-types";
import {MAX_GENRES} from "../../common/consts";

const GenreList = (props) => {
  const {genres, activeGenre, onFilterClick} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.slice(0, MAX_GENRES).map((genre, index) => {
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
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired
};

export default GenreList;
