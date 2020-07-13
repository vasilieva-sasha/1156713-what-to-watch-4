import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "../main/main.jsx";
import FilmInfo from "../film-info/film-info.jsx";
import {connect} from "react-redux";

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
    const {title, genre, date} = this.props;
    return (
      <Main title={title}
        genre={genre}
        date={date}
        onCardClick={this._handlerCardClick}
      />
    );
  }

  _renderFilmInfo() {
    const {films} = this.props;
    const filmInfo = this.state.selectedFilm;
    return (
      <FilmInfo films={films} film={filmInfo} onCardClick={this._handlerCardClick}/>
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
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
});

export default connect(mapStateToProps)(App);
