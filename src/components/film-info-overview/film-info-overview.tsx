import * as React from "react";
import {getRatingLevel} from "../../common/utils";
import {Film} from './../../types';

interface Props {
  film: Film;
}


const FilmInfoOverview: React.FunctionComponent<Props> = (props: Props) => {
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

export default FilmInfoOverview;
