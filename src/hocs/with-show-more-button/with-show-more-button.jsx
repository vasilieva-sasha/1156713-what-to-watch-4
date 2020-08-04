import React, {PureComponent} from "react";
import {FILMS_SHOW_AMOUNT} from '../../common/consts';
import PropTypes from 'prop-types';
import CatalogButton from '../../components/catalog-button/catalog-button';

const withShowMoreButton = (Component) => {
  class WithShowMoreButton extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        filmsAmount: FILMS_SHOW_AMOUNT,
      };

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
      this.setState({filmsAmount: this.state.filmsAmount + FILMS_SHOW_AMOUNT});
    }

    render() {
      const {films, genre} = this.props;
      return (
        <Component
          shownFilms={this._getShownFilms()}
          genre={genre}
        >
          {films.length > this._getShownFilms().length ? <CatalogButton onCatalogButtonClick={this._handleCatalogButtonClick} /> : ``}
        </Component>
      );
    }
  }

  WithShowMoreButton.propTypes = {
    films: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          poster: PropTypes.string
        }))
      .isRequired,
    genre: PropTypes.string.isRequired,
  };

  return WithShowMoreButton;
};

export default withShowMoreButton;
