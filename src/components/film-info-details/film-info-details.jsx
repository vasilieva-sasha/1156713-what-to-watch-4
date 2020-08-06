import React from "react";
import PropTypes from "prop-types";
import {getFilmDuration} from './../../common/utils';

const FilmInfoDetails = (props) => {
  const {film} = props;
  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{film.director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {film.actors.map((actor, index) => {
              return (
                <React.Fragment key={index}>
                  {actor}
                  {index !== film.actors.length - 1 ? `,` : ``}
                  {index !== film.actors.length - 1 ? <br/> : ``}
                </React.Fragment>
              );
            })}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{getFilmDuration(film.runtime)}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{film.genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{film.releaseDate}</span>
        </p>
      </div>
    </div>
  );
};

FilmInfoDetails.propTypes = {
  film: PropTypes.shape({
    director: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    runtime: PropTypes.number.isRequired
  }).isRequired
};
export default FilmInfoDetails;
