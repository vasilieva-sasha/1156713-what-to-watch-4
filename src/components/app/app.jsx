import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "../main/main";
import FilmInfo from "../film-info/film-info";
import {connect} from "react-redux";
import {getFilms, getServerError} from "../../reducer/data/selectors";
import LoadErrorScreen from "../load-error-screen/load-error-screen";

const App = (props) => {
  const {films, serverError, selectedFilm, onCardClick} = props;

  const renderApp = () => {
    if (serverError) {
      return <LoadErrorScreen/>;
    } else {
      if (selectedFilm) {
        return renderFilmInfo();
      }
      return renderMain();
    }
  };

  const renderMain = () => {
    return (
      <Main
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
  serverError: PropTypes.bool.isRequired,
  selectedFilm: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }),
  onCardClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  serverError: getServerError(state)
});

export default connect(mapStateToProps)(App);
