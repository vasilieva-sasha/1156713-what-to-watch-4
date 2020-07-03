import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {makeLetterUppercase} from "../../common/utils";

const TABS = [`overview`, `details`, `reviews`];

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

  render() {
    const {onTabClick} = this.props;

    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {TABS.map((tab, index) => {
            return (
              <li key={`${tab}-${index}`} className={`movie-nav__item ${this.state.detailsScreen === index ? `movie-nav__item--active` : ``}`}>
                <a href="#" className="movie-nav__link" onClick={(evt) => {
                  evt.preventDefault();
                  this._handleLinkClick(index);
                  onTabClick(index);
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
  onTabClick: PropTypes.func.isRequired
};

export default FilmInfoNavigation;
