import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "../main/main";
import FilmInfo from "../film-info/film-info";
import {connect} from "react-redux";
import {getFilms, getServerError, getPromo} from "../../reducer/data/selectors";
import LoadErrorScreen from "../load-error-screen/load-error-screen";
import withFullPlayer from "../../hocs/with-full-player/with-full-player";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player";
import {getPlayerStatus, getActiveCard, getAuthorizationBool} from "../../reducer/app/selectors";
import withActiveFullScreenPlayer from './../../hocs/with-active-full-screen-player/with-active-full-screen-player';
import {Operations as DataOperations} from "../../reducer/data/data";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {Operations as UserOperations} from "../../reducer/user/user";
import SignIn from './../sign-in/sign-in';
import {getsignInErrorStatus} from './../../reducer/user/selectors';

const FilminfoWrapped = withFullPlayer(FilmInfo);
const FullScreenVideoPlayerWrapper = withActiveFullScreenPlayer(FullScreenVideoPlayer);

const App = (props) => {
  const {films, serverError, isFullPlayerActive, promoFilm, selectedFilm, onCardClick, isAuthorization, login, onSignIn, singInError} = props;

  const renderApp = () => {
    if (serverError) {
      return <LoadErrorScreen/>;
    } else {
      if (isFullPlayerActive) {
        return <FullScreenVideoPlayerWrapper film={!selectedFilm ? promoFilm : selectedFilm}/>;
      }
      if (selectedFilm) {
        return renderFilmInfo();
      }
      if (isAuthorization) {
        return <SignIn onSubmit={login} onSignIn={onSignIn} singInError={singInError}/>;
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
      <FilminfoWrapped films={films} film={selectedFilm} onCardClick={onCardClick}/>
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
        <Route exact path="/login">
          <SignIn onSubmit={login} onSignIn={onSignIn} singInError={singInError}/>
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
  promoFilm: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }),
  serverError: PropTypes.bool.isRequired,
  isFullPlayerActive: PropTypes.bool,
  selectedFilm: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }),
  onCardClick: PropTypes.func.isRequired,
  isAuthorization: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  singInError: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  promoFilm: getPromo(state),
  serverError: getServerError(state),
  isFullPlayerActive: getPlayerStatus(state),
  selectedFilm: getActiveCard(state),
  isAuthorization: getAuthorizationBool(state),
  singInError: getsignInErrorStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick(film) {
    dispatch(DataOperations.loadReviews(film));
    dispatch(AppActionCreator.changeCard(film));
  },
  login(authData) {
    dispatch(UserOperations.login(authData));
  },
  onSignIn(singInError) {
    if (!singInError) {
      dispatch(UserOperations.checkAuth());
      dispatch(AppActionCreator.changeAuthorizationPage(false));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
