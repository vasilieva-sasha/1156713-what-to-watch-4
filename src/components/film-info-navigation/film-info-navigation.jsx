import React, {PureComponent} from "react";
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

class FilmInfoNavigation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      detailsScreen: 0
    };
  }

  _handleLinkClick(index) {
    this.setState({
      detailsScreen: index
    });
  }

  _renderScreen() {
    const {detailsScreen} = this.state;
    const {film} = this.props;
    if (detailsScreen === FilmInfoScreen.OVERVIEW) {
      return <FilmInfoOverview film={film} />;
    } else if (detailsScreen === FilmInfoScreen.DETAILS) {
      return <FilmInfoDetails film={film}/>;
    } else if (detailsScreen === FilmInfoScreen.REVIEWS) {
      return <FilmInfoReviews film={film}/>;
    }
    return null;
  }

  _renderNavigationMenu() {

    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {TABS.map((tab, index) => {
            return (
              <li key={`${tab}-${index}`} className={`movie-nav__item ${this.state.detailsScreen === index ? `movie-nav__item--active` : ``}`}>
                <a href="#" className="movie-nav__link" onClick={(evt) => {
                  evt.preventDefault();
                  this._handleLinkClick(index);
                }}>{makeLetterUppercase(tab)}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  render() {
    return (
      <div className="movie-card__desc">
        {this._renderNavigationMenu()}
        {this._renderScreen()}

      </div>
    );
  }
}

FilmInfoNavigation.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    posterInfo: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired
  }),
};

export default FilmInfoNavigation;
