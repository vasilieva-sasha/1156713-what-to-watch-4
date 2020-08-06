import * as React from "react";
import FilmCard from "../film-card/film-card";
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import {Film} from "../../types";

interface Props {
  shownFilms: Array<Film>;
  genre: string;
  children?: React.ReactNode;
}

const FilmCardWrapped = withActivePlayer(FilmCard);

const FilmList: React.FunctionComponent<Props> = (props: Props) => {

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

export default FilmList;
