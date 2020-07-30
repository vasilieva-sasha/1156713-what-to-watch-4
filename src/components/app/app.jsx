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
import {getPlayerStatus, getActiveCard} from "../../reducer/app/selectors";
import withActiveFullScreenPlayer from './../../hocs/with-active-full-screen-player/with-active-full-screen-player';
import {Operations as DataOperations} from "../../reducer/data/data";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {Operations as UserOperations} from "../../reducer/user/user";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user";
import SignIn from './../sign-in/sign-in';
import {getsignInErrorStatus} from './../../reducer/user/selectors';
import {CurrentPage} from "../../common/consts";
import {getCurrentPage} from './../../reducer/app/selectors';
import AddReview from "../add-review/add-review";

const FilminfoWrapped = withFullPlayer(FilmInfo);
const FullScreenVideoPlayerWrapper = withActiveFullScreenPlayer(FullScreenVideoPlayer);

const App = (props) => {
  const {films, serverError, isFullPlayerActive, currentPage, promoFilm, selectedFilm, onCardClick, login, onSignIn, singInError, onReviewSubmit} = props;

  const renderApp = () => {
    if (serverError) {
      return <LoadErrorScreen/>;
    } else {

      if (isFullPlayerActive) {
        return <FullScreenVideoPlayerWrapper film={!selectedFilm ? promoFilm : selectedFilm}/>;
      }

      switch (currentPage) {
        case CurrentPage.PLAYER:
          return <FullScreenVideoPlayerWrapper film={!selectedFilm ? promoFilm : selectedFilm}/>;
        case CurrentPage.INFO:
          return renderFilmInfo();
        case CurrentPage.LOGIN:
          return <SignIn onSubmit={login} onSignIn={onSignIn} singInError={singInError}/>;
        case CurrentPage.REVIEW:
          return <AddReview film={selectedFilm} onSubmit={onReviewSubmit}/>;
        default:
          return renderMain();
      }
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
  login: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  singInError: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  promoFilm: getPromo(state),
  serverError: getServerError(state),
  isFullPlayerActive: getPlayerStatus(state),
  selectedFilm: getActiveCard(state),
  singInError: getsignInErrorStatus(state),
  currentPage: getCurrentPage(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick(film) {
    dispatch(AppActionCreator.changePage(CurrentPage.INFO));
    dispatch(DataOperations.loadReviews(film));
    dispatch(AppActionCreator.changeCard(film));
  },
  login(authData) {
    dispatch(UserOperations.login(authData));

  },
  onSignIn() {
    dispatch(UserActionCreator.checkSignIn(false));
  },
  onReviewSubmit(film, reviewData) {
    dispatch(DataOperations.sendReview(film, reviewData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
