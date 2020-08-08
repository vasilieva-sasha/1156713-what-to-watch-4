import * as React from "react";
import {MAX_GENRES} from "../../common/consts";
import {Film} from "../../types";

interface Props {
  films: Array<Film>;
  genres: Array<string>;
  activeGenre: string;
  onFilterClick: (films: Array<Film>, genre: string) => void;
}

const GenreList: React.FunctionComponent<Props> = (props: Props) => {
  const {films, genres, activeGenre, onFilterClick} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.slice(0, MAX_GENRES).map((genre, index) => {
        return (
          <li key={`${genre}-${index}`}
            className={`catalog__genres-item ${genre === activeGenre ? `catalog__genres-item--active` : ``}`}>
            <a href="#" className="catalog__genres-link"
              onClick={(evt) => {
                evt.preventDefault();
                onFilterClick(films, genre);
              }}>{genre}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default GenreList;
