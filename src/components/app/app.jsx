import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "../main/main";
import FilmInfo from "../film-info/film-info";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer";

const App = (props) => {
  const {films, title, genre, date, selectedFilm, onCardClick} = props;

  const renderApp = () => {
    if (selectedFilm) {
      return renderFilmInfo();
    }
    return renderMain();
  };

  const renderMain = () => {
    return (
      <Main title={title}
        genre={genre}
        date={date}
        onCardClick={onCardClick}
      />
    );
  };

  const renderFilmInfo = () => {
    return (
      <FilmInfo films={films} film={selectedFilm} onCardClick={onCardClick}/>
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderApp()}
        </Route>
        <Route exact path="/dev-film">
          {renderFilmInfo()}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  selectedFilm: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }),
  onCardClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  films: state.films,
  selectedFilm: state.activeCard
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick(film) {
    dispatch(ActionCreator.changeCard(film));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
