import React from "react";
import PropTypes from "prop-types";
import FilmInfoOverview from "../film-info-overview/film-info-overview.jsx";
import FilmInfoDetails from "../film-info-details/film-info-details.jsx";
import FilmInfoReviews from "../film-info-reviews/film-info-reviews.jsx";
import {makeLetterUppercase} from "../../common/utils";

const TABS = [`overview`, `details`, `reviews`];

const FilmInfoScreen = {
  OVERVIEW: 0,
  DETAILS: 1,
  REVIEWS: 2
};

const FilmInfoNavigation = (props) => {
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

FilmInfoNavigation.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    posterInfo: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired
  }),
  detailsScreen: PropTypes.number.isRequired,
  onLinkClick: PropTypes.func.isRequired
};

export default FilmInfoNavigation;
