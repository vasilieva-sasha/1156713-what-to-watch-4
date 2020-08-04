import React from "react";
import PropTypes from "prop-types";
import {getRatingLevel} from "../../common/utils";

const FilmInfoOverview = (props) => {
  const {film} = props;
  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{film.rating.score}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingLevel(Math.round(film.rating.score))}</span>
          <span className="movie-rating__count">{film.rating.count} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{film.text}</p>

        <p className="movie-card__director"><strong>Director: {film.director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {film.actors} and other</strong></p>
      </div>
    </React.Fragment>
  );
};

FilmInfoOverview.propTypes = {
  film: PropTypes.shape({
    rating: PropTypes.shape({
      score: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    }),
    text: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

export default FilmInfoOverview;
