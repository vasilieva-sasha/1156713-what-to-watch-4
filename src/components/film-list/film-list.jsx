import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import FilmCard from "../film-card/film-card";
import {TIMEOUT, FILMS_SHOW_AMOUNT} from "../../common/consts";
import CatalogButton from './../catalog-button/catalog-button';
import {connect} from "react-redux";
import withActivePlayer from './../../hocs/with-active-player/with-active-player';

const FilmCardWrapped = withActivePlayer(FilmCard);

class FilmList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCard: null,
      filmsAmount: FILMS_SHOW_AMOUNT,
      activeGenre: props.genre
    };

    this._timeOut = null;
    this._shownFilms = FILMS_SHOW_AMOUNT;

    this._handleArticleHover = this._handleArticleHover.bind(this);
    this._handleCardLeave = this._handleCardLeave.bind(this);
    this._handleCatalogButtonClick = this._handleCatalogButtonClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.genre !== this.state.activeGenre) {
      this.setState({
        selectedCard: null,
        filmsAmount: FILMS_SHOW_AMOUNT
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timeOut);
    this.setState({
      selectedCard: null,
      filmsAmount: FILMS_SHOW_AMOUNT
    });
  }

  _getShownFilms() {
    const {films} = this.props;
    const {filmsAmount} = this.state;

    return films.slice(0, filmsAmount);
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

  _handleCatalogButtonClick() {
    this._shownFilms = this._shownFilms + FILMS_SHOW_AMOUNT;
    this.setState({filmsAmount: this._shownFilms});
  }

  render() {
    const {films, onCardClick} = this.props;
    const {selectedCard, filmsAmount} = this.state;
    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {this._getShownFilms().map((film, index) => {
            return (
              <FilmCardWrapped
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
        {films.length > filmsAmount ? <CatalogButton onCatalogButtonClick={this._handleCatalogButtonClick} /> : ``}
      </React.Fragment>
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
  onCardClick: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  genre: state.genre,
});

export default connect(mapStateToProps)(FilmList);
