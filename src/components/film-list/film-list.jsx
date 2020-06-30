import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import FilmCard from "../film-card/film-card.jsx";
import {TIMEOUT} from "../../common/consts";

class FilmList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCard: null
    };

    this._timeOut = null;

    this._handleArticleHover = this._handleArticleHover.bind(this);
    this._handleCardLeave = this._handleCardLeave.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this._timeOut);
    this.setState({
      selectedCard: null
    });
  }

  _handleArticleHover(currentFilm) {
    this._timeOut = setTimeout(() => {
      this.setState({selectedCard: currentFilm});
    }, TIMEOUT);
  }

  _handleCardLeave() {
    clearTimeout(this._timeOut);
    this.setState({
      selectedCard: null
    });
  }

  render() {
    const {films, onCardClick} = this.props;
    const {selectedCard} = this.state;
    return (
      <div className="catalog__movies-list">
        {films.map((film, index) => {
          return (
            <FilmCard
              key={`${film.poster}-${index}`}
              film={film}
              onArticleHover={(currentFilm) => {
                currentFilm = films[index];
                this._handleArticleHover(currentFilm);
              }}
              onCardClick={onCardClick}
              isPlaying={selectedCard === films[index]}
              onCardLeave={this._handleCardLeave}
            />);
        })}
      </div>
    );
  }
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        poster: PropTypes.string
      }))
    .isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default FilmList;
