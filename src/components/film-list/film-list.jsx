import React from "react";
import PropTypes from "prop-types";
import FilmCard from "../film-card/film-card";
import withActivePlayer from './../../hocs/with-active-player/with-active-player';

const FilmCardWrapped = withActivePlayer(FilmCard);

const FilmList = (props) => {

  const {shownFilms, children} = props;

  return (
    <React.Fragment>
      <div className="catalog__movies-list">
        {shownFilms.map((film, index) => {
          return (
            <FilmCardWrapped
              key={`${film.poster}-${index}`}
              film={film}
            />);
        })}
      </div>
      {children}
    </React.Fragment>
  );

};

FilmList.propTypes = {
  shownFilms: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        poster: PropTypes.string
      }))
    .isRequired,
  genre: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default FilmList;
