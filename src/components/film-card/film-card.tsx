import * as React from "react";
import VideoPlayer from "../video-player/video-player";
import {Link} from 'react-router-dom';
import {AppRoute} from "../../common/consts";
import {Film} from './../../types';

interface Props {
  film: Film;
  onArticleHover: () => void;
  isPlaying: boolean;
  onCardLeave: () => void;
}


const FilmCard: React.FunctionComponent<Props> = (props: Props) => {
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

export default FilmCard;
