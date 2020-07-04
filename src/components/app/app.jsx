import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Main} from "../main/main.jsx";
import FilmInfo from "../film-info/film-info.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilm: null
    };

    this._handlerCardClick = this._handlerCardClick.bind(this);
  }

  _renderApp() {
    const {selectedFilm} = this.state;

    if (selectedFilm) {
      return this._renderFilmInfo();
    }
    return this._renderMain();
  }

  _renderMain() {
    const {title, genre, date, films} = this.props;
    return (
      <Main title={title}
        genre={genre}
        date={date}
        films={films}
        onCardClick={this._handlerCardClick}
      />
    );
  }

  _renderFilmInfo() {
    const filmInfo = this.state.selectedFilm;
    return (
      <FilmInfo film={filmInfo} onCardClick={this._handlerCardClick}/>
    );
  }

  _handlerCardClick(film) {
    this.setState({
      selectedFilm: film
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            {this._renderFilmInfo()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        releaseDate: PropTypes.number.isRequired,
        posterInfo: PropTypes.string.isRequired,
        background: PropTypes.string.isRequired,
        rating: PropTypes.shape({
          score: PropTypes.string.isRequired,
          level: PropTypes.string.isRequired,
          count: PropTypes.number.isRequired
        }),
        text: PropTypes.arrayOf(PropTypes.string).isRequired,
        director: PropTypes.string.isRequired,
        actors: PropTypes.arrayOf(PropTypes.string).isRequired
      }))
    .isRequired,
};

export {App};
