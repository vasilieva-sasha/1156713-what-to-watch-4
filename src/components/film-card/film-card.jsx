import React from "react";
import PropTypes from "prop-types";

const FilmCard = (props) => {
  const {film, onArticleHover, onCardClick} = props;
  return (
    <article
      onMouseEnter={() => onArticleHover(film)}
      onMouseLeave={() => onArticleHover({})}
      className="small-movie-card catalog__movies-card">
      <div onClick={(evt) => {
        evt.preventDefault();
        onCardClick(film);
      }} className="small-movie-card__image">
        <img src={`img/${film.poster}.jpg`} alt={film.title} width="280" height="175"/>
      </div>
      <h3 onClick={(evt) => {
        evt.preventDefault();
        onCardClick(film);
      }} className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{film.title}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  }).isRequired,
  onArticleHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default FilmCard;
