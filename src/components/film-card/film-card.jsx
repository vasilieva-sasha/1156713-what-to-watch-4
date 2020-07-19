import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player";

const FilmCard = (props) => {
  const {film, onArticleHover, onCardClick, isPlaying, onCardLeave} = props;

  return (
    <article
      onMouseEnter={onArticleHover}
      onMouseLeave={onCardLeave}
      className="small-movie-card catalog__movies-card">
      <div onClick={(evt) => {
        evt.preventDefault();
        onCardClick(film);
      }} className="small-movie-card__image">
        <VideoPlayer isPlaying={isPlaying} film={film} />
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
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }).isRequired,
  onArticleHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onCardLeave: PropTypes.func.isRequired
};

export default FilmCard;
