import React, {PureComponent} from "react";
import {FILMS_SHOW_AMOUNT} from './../../common/consts';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const withFilmsAmount = (Component) => {
  class WithFilmsAmount extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        filmsAmount: FILMS_SHOW_AMOUNT,
      };

      this._shownFilms = FILMS_SHOW_AMOUNT;

      this._handleCatalogButtonClick = this._handleCatalogButtonClick.bind(this);
      this._updateAmount = this._updateAmount.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.genre !== this.props.genre) {
        this._updateAmount();
      }
    }

    _updateAmount() {
      this.setState({
        filmsAmount: FILMS_SHOW_AMOUNT
      });
    }

    componentWillUnmount() {
      this.setState({
        filmsAmount: FILMS_SHOW_AMOUNT
      });
    }

    _getShownFilms() {
      const {films} = this.props;
      const {filmsAmount} = this.state;

      return films.slice(0, filmsAmount);
    }

    _handleCatalogButtonClick() {
      this._shownFilms = this._shownFilms + FILMS_SHOW_AMOUNT;
      this.setState({filmsAmount: this._shownFilms});
    }

    render() {
      const {films, onCardClick} = this.props;
      return (
        <Component films={films}
          shownFilms={this._getShownFilms()}
          onCardClick={onCardClick}
          onCatalogButtonClick={this._handleCatalogButtonClick}
          onGenreUpdate ={this._updateAmount}/>
      );
    }
  }

  WithFilmsAmount.propTypes = {
    films: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          poster: PropTypes.string
        }))
      .isRequired,
    genre: PropTypes.string.isRequired,
    onCardClick: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    genre: state.genre,
  });

  return connect(mapStateToProps)(WithFilmsAmount);
};

export default withFilmsAmount;
