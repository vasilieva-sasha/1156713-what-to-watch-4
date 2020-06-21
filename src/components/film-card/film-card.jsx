import React from "react";
import PropTypes from "prop-types";

const FilmCard = (props) => {
  const {film, onArticleHover, onTitleClick} = props;
  return (
    <article
      onMouseEnter={() => onArticleHover(film)}
      onMouseLeave={() => onArticleHover({})}
      className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={`img/${film.poster}.jpg`} alt={film.title} width="280" height="175"/>
      </div>
      <h3 onClick={onTitleClick} className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{film.title}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  // id: PropTypes.number.isRequired,
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  }).isRequired,
  onArticleHover: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired
};

export default FilmCard;
