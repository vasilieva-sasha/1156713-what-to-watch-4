import * as React from "react";
import FilmInfoOverview from "../film-info-overview/film-info-overview";
import FilmInfoDetails from "../film-info-details/film-info-details";
import FilmInfoReviews from "../film-info-reviews/film-info-reviews";
import {makeLetterUppercase} from "../../common/utils";
import {Film} from './../../types';

interface Props {
  film: Film;
  detailsScreen: number;
  onLinkClick: (index: number) => void;
}

const TABS = [`overview`, `details`, `reviews`];

const FilmInfoScreen = {
  OVERVIEW: 0,
  DETAILS: 1,
  REVIEWS: 2
};

const FilmInfoNavigation: React.FunctionComponent<Props> = (props: Props) => {
  const {film, detailsScreen, onLinkClick} = props;

  const renderScreen = () => {
    if (detailsScreen === FilmInfoScreen.OVERVIEW) {
      return <FilmInfoOverview film={film} />;
    } else if (detailsScreen === FilmInfoScreen.DETAILS) {
      return <FilmInfoDetails film={film}/>;
    } else if (detailsScreen === FilmInfoScreen.REVIEWS) {
      return <FilmInfoReviews film={film}/>;
    }
    return null;
  };

  const renderNavigationMenu = () => {

    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {TABS.map((tab, index) => {
            return (
              <li key={`${tab}-${index}`} className={`movie-nav__item ${detailsScreen === index ? `movie-nav__item--active` : ``}`}>
                <a href="#" className="movie-nav__link" onClick={(evt) => {
                  evt.preventDefault();
                  onLinkClick(index);
                }}>{makeLetterUppercase(tab)}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };

  return (
    <div className="movie-card__desc">
      {renderNavigationMenu()}
      {renderScreen()}
    </div>
  );
};

export default FilmInfoNavigation;
