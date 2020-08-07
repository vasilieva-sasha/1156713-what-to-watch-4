import * as React from "react";
import {Subtract} from "utility-types";
import {FILMS_SHOW_AMOUNT} from '../../common/consts';
import CatalogButton from '../../components/catalog-button/catalog-button';
import {Film} from "../../types";

interface State {
  filmsAmount: number;
}

interface InjectedProps {
  films: Array<Film>;
  genre: string;
}

const withShowMoreButton = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithShowMoreButton extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        filmsAmount: FILMS_SHOW_AMOUNT,
      };

      this.handleCatalogButtonClick = this.handleCatalogButtonClick.bind(this);
      this.updateAmount = this.updateAmount.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.genre !== this.props.genre) {
        this.updateAmount();
      }
    }

    componentWillUnmount() {
      this.setState({
        filmsAmount: FILMS_SHOW_AMOUNT
      });
    }

    private updateAmount() {
      this.setState({
        filmsAmount: FILMS_SHOW_AMOUNT
      });
    }

    private getShownFilms() {
      const {films} = this.props;
      const {filmsAmount} = this.state;

      return films.slice(0, filmsAmount);
    }

    private handleCatalogButtonClick() {
      this.setState({filmsAmount: this.state.filmsAmount + FILMS_SHOW_AMOUNT});
    }

    render() {
      const {films, genre} = this.props;
      return (
        <Component
          shownFilms={this.getShownFilms()}
          genre={genre}
        >
          {films.length > this.getShownFilms().length ? <CatalogButton onCatalogButtonClick={this.handleCatalogButtonClick} /> : ``}
        </Component>
      );
    }
  }

  return WithShowMoreButton;
};

export default withShowMoreButton;
