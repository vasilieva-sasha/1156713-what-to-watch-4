import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {makeLetterUppercase} from "../../common/utils";

const TABS = [`overview`, `details`, `reviews`];

class FilmInfoNavigation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isActive: {
        overview: true,
        details: false,
        reviews: false
      }
    };
  }

  _handleLinkClick(tab) {
    this.setState({
      isActive: {
        [tab]: true
      }});
  }

  render() {

    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {TABS.map((tab, index) => {
            return (
              <li key={`${tab}-${index}`} className={`movie-nav__item ${this.state.isActive[tab] ? `movie-nav__item--active` : ``}`}>
                <a href="#" className="movie-nav__link" onClick={(evt) => {
                  evt.preventDefault();
                  this._handleLinkClick(tab);
                }}>{makeLetterUppercase(tab)}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

FilmInfoNavigation.propTypes = {

};

export default FilmInfoNavigation;
