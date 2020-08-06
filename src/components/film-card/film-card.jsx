import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player";
import {Link} from 'react-router-dom';
import {AppRoute} from "../../common/consts";

const FilmCard = (props) => {
  const {film, onArticleHover, isPlaying, onCardLeave} = props;

  return (
    <article
      onMouseEnter={onArticleHover}
      onMouseLeave={onCardLeave}
      className="small-movie-card catalog__movies-card">
      <Link to={`${AppRoute.FILM}/${film.id}`} className="small-movie-card__image">
        <VideoPlayer isPlaying={isPlaying} film={film} />
      </Link>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`${AppRoute.FILM}/${film.id}`}>{film.title}</Link>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }).isRequired,
  onArticleHover: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onCardLeave: PropTypes.func.isRequired
};

export default FilmCard;
