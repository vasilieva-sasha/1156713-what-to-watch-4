import React from "react";
import PropTypes from "prop-types";
import FilmCard from "../film-card/film-card";
import CatalogButton from './../catalog-button/catalog-button';
import withActivePlayer from './../../hocs/with-active-player/with-active-player';

const FilmCardWrapped = withActivePlayer(FilmCard);

const FilmList = (props) => {

  const {films, shownFilms, onCardClick, onCatalogButtonClick} = props;

  return (
    <React.Fragment>
      <div className="catalog__movies-list">
        {shownFilms.map((film, index) => {
          return (
            <FilmCardWrapped
              key={`${film.poster}-${index}`}
              film={film}
              onCardClick={onCardClick}
            />);
        })}
      </div>
      {films.length > shownFilms.length ? <CatalogButton onCatalogButtonClick={onCatalogButtonClick} /> : ``}
    </React.Fragment>
  );

};

FilmList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        poster: PropTypes.string
      }))
    .isRequired,
  shownFilms: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        poster: PropTypes.string
      }))
    .isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCatalogButtonClick: PropTypes.func.isRequired,
  onGenreUpdate: PropTypes.func.isRequired
};

export default FilmList;
