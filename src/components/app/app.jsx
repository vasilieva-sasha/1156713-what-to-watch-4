import React from "react";
import PropTypes from "prop-types";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import Main from "../main/main";
import FilmInfo from "../film-info/film-info";
import {connect} from "react-redux";
import {getFilms, getServerError, getFavoriteFilms, getReviewStatus} from "../../reducer/data/selectors";
import LoadErrorScreen from "../load-error-screen/load-error-screen";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player";
import withActiveFullScreenPlayer from './../../hocs/with-active-full-screen-player/with-active-full-screen-player';
import {Operations as DataOperations} from "../../reducer/data/data";
import {Operations as UserOperations} from "../../reducer/user/user";
import SignIn from './../sign-in/sign-in';
import {getsignInErrorStatus, getAuthorizationStatus, getAuthInfo} from './../../reducer/user/selectors';
import {AppRoute, AuthorizationStatus} from "../../common/consts";
import AddReview from "../add-review/add-review";
import withInputHandlers from './../../hocs/with-input-hadlers/with-input-handlers';
import MyList from "../my-list/my-list";
import history from './../../history';
import PrivateRoute from './../private-router/private-router';
import LoadingScreen from "../loading-screen/loading-screen";

const FullScreenVideoPlayerWrapper = withActiveFullScreenPlayer(FullScreenVideoPlayer);
const AddReviewWrapped = withInputHandlers(AddReview);

const App = (props) => {
  const {films, serverError, login, signInError, onReviewSubmit, favoriteFilms, authorizationStatus, authInfo, isReviewSent} = props;

  const getCurrentFilmById = (id) => {
    return films.find((film) => film.id === id);
  };

  const renderApp = () => {
    if (serverError) {
      return <LoadErrorScreen/>;
    } else if (authorizationStatus === AuthorizationStatus.AUTH && !authInfo) {
      return <LoadingScreen />;
    } else {
      return renderMain();
    }
  };

  const renderMain = () => {
    return (
      <Main/>
    );
  };

  const renderFilmInfo = (match) => {
    const id = Number(match.params.id);
    return (
      <FilmInfo films={films} film={getCurrentFilmById(id)}/>
    );
  };

  const renderVideoPage = (match) => {
    const id = Number(match.params.id);
    return getCurrentFilmById(id)
      ? <FullScreenVideoPlayerWrapper film={getCurrentFilmById(id)} />
      : <LoadingScreen />;
  };

  const renderSignIn = () => {
    return (
      authorizationStatus === AuthorizationStatus.NO_AUTH ?
        <SignIn onSubmit={login} signInError={signInError}/> :
        <Redirect to={AppRoute.MAIN} />
    );
  };

  const renderAddReview = (match) => {
    const id = Number(match.params.id);
    return (
      !isReviewSent ?
        <AddReviewWrapped film={getCurrentFilmById(id)} onReviewSubmit={onReviewSubmit}/> :
        <Redirect to={`${AppRoute.FILM}/${id}`} />
    );
  };

  const renderMyList = () => {
    return (
      <MyList films={favoriteFilms}/>
    );
  };

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.MAIN} render={() => renderApp()} />
        <Route exact path={AppRoute.SIGN_IN} render={() => renderSignIn()}/>
        <PrivateRoute exact path={AppRoute.MYLIST} render={() => renderMyList()} />
        <Route exact path={`${AppRoute.FILM}/:id${AppRoute.PLAYER}`} render={({match}) => renderVideoPage(match)}/>
        <PrivateRoute exact path={`${AppRoute.FILM}/:id${AppRoute.ADD_REVIEW}`} render={({match}) => renderAddReview(match)} />
        <Route exact path={`${AppRoute.FILM}/:id`} render={({match}) => renderFilmInfo(match)} />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  serverError: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  signInError: PropTypes.bool.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
  favoriteFilms: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }),
  isReviewSent: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  serverError: getServerError(state),
  signInError: getsignInErrorStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
  favoriteFilms: getFavoriteFilms(state),
  authInfo: getAuthInfo(state),
  isReviewSent: getReviewStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperations.login(authData));
  },
  onReviewSubmit(film, reviewData) {
    dispatch(DataOperations.sendReview(film, reviewData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
