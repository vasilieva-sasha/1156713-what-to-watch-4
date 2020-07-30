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
import SignIn from './../sign-in/sign-in';
import {getsignInErrorStatus} from './../../reducer/user/selectors';
import {CurrentPage} from "../../common/consts";
import {getCurrentPage} from './../../reducer/app/selectors';
import AddReview from "../add-review/add-review";
import withInputHandlers from './../../hocs/with-input-hadlers/with-input-handlers';

const FilminfoWrapped = withFullPlayer(FilmInfo);
const FullScreenVideoPlayerWrapper = withActiveFullScreenPlayer(FullScreenVideoPlayer);
const AddReviewWrapped = withInputHandlers(AddReview);

const App = (props) => {
  const {films, serverError, isFullPlayerActive, currentPage, promoFilm, selectedFilm, onCardClick, login, singInError, onReviewSubmit} = props;

  const renderApp = () => {
    if (currentPage === CurrentPage.MAIN && serverError) {
      return <LoadErrorScreen/>;
    } else {

      if (isFullPlayerActive) {
        return <FullScreenVideoPlayerWrapper film={!selectedFilm ? promoFilm : selectedFilm}/>;
      }

      switch (currentPage) {
        case CurrentPage.INFO:
          return renderFilmInfo();
        case CurrentPage.LOGIN:
          return renderSignIn();
        case CurrentPage.REVIEW:
          return renderAddReview();
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

  const renderSignIn = () => {
    return (
      <SignIn onSubmit={login} singInError={singInError}/>
    );
  };

  const renderAddReview = () => {
    return (
      <AddReviewWrapped film={selectedFilm} onReviewSubmit={onReviewSubmit}/>
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
          {renderSignIn()}
        </Route>
        <Route exact path="/dev-review">
          {renderAddReview()}
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
  onReviewSubmit(film, reviewData) {
    dispatch(DataOperations.sendReview(film, reviewData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
