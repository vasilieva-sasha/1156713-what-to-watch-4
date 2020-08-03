import React from "react";
import PropTypes from "prop-types";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import Main from "../main/main";
import FilmInfo from "../film-info/film-info";
import {connect} from "react-redux";
import {getFilms, getServerError, getPromo, getFavoriteFilms} from "../../reducer/data/selectors";
import LoadErrorScreen from "../load-error-screen/load-error-screen";
import withFullPlayer from "../../hocs/with-full-player/with-full-player";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player";
import {getPlayerStatus, getActiveCard} from "../../reducer/app/selectors";
import withActiveFullScreenPlayer from './../../hocs/with-active-full-screen-player/with-active-full-screen-player';
import {Operations as DataOperations} from "../../reducer/data/data";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {Operations as UserOperations} from "../../reducer/user/user";
import SignIn from './../sign-in/sign-in';
import {getsignInErrorStatus, getAuthorizationStatus} from './../../reducer/user/selectors';
import {CurrentPage, AppRoute, AuthorizationStatus} from "../../common/consts";
import {getCurrentPage} from './../../reducer/app/selectors';
import AddReview from "../add-review/add-review";
import withInputHandlers from './../../hocs/with-input-hadlers/with-input-handlers';
import MyList from "../my-list/my-list";
import history from './../../history';

const FilminfoWrapped = withFullPlayer(FilmInfo);
const FullScreenVideoPlayerWrapper = withActiveFullScreenPlayer(FullScreenVideoPlayer);
const AddReviewWrapped = withInputHandlers(AddReview);

const App = (props) => {
  const {films, serverError, isFullPlayerActive, currentPage, promoFilm, selectedFilm, onCardClick, login, singInError, onReviewSubmit, favoriteFilms, authorizationStatus} = props;

  const renderApp = () => {
    if (currentPage === CurrentPage.MAIN && serverError) {
      return <LoadErrorScreen/>;
    } else {


      // return renderMain();

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

  const renderSignIn = (routeProps) => {
    return (
      authorizationStatus === AuthorizationStatus.AUTH ?
        routeProps.history.goBack() :
        <SignIn onSubmit={login} singInError={singInError}/>
    );
  };

  const renderAddReview = () => {
    return (
      <AddReviewWrapped film={selectedFilm} onReviewSubmit={onReviewSubmit}/>
    );
  };

  const renderMyList = () => {
    return (
      authorizationStatus === AuthorizationStatus.AUTH ?
        <MyList films={favoriteFilms} onCardClick={onCardClick} /> :
        <Redirect to={AppRoute.SIGN_IN} />
    );
  };

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => renderApp()} />
        <Route exact path={AppRoute.SIGN_IN} render={(routeProps) => renderSignIn(routeProps)}/>
        <Route exact path={AppRoute.MYLIST} render={() => renderMyList()} />
      </Switch>
    </Router>
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
  favoriteFilms: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  promoFilm: getPromo(state),
  serverError: getServerError(state),
  isFullPlayerActive: getPlayerStatus(state),
  selectedFilm: getActiveCard(state),
  singInError: getsignInErrorStatus(state),
  currentPage: getCurrentPage(state),
  authorizationStatus: getAuthorizationStatus(state),
  favoriteFilms: getFavoriteFilms(state),
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
  },
  loadFavoriteFilms() {
    dispatch(DataOperations.loadFavoriteFilms());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
