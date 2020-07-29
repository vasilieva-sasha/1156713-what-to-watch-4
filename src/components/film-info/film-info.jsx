import React from "react";
import PropTypes from "prop-types";
import FilmInfoNavigation from "../film-info-navigation/film-info-navigation";
import FilmList from "../film-list/film-list";
import {SIMILAR_FILMS_AMOUNT_SHOW, AuthorizationStatus} from "../../common/consts";
import withFilmsAmount from './../../hocs/with-films-amount/with-films-amount';
import withActiveNavigationScreen from "../../hocs/with-active-navigation-screen/with-active-navigation-screen";
import Header from './../header/header';
import {getAuthorizationStatus} from './../../reducer/user/selectors';
import {connect} from "react-redux";

const FilmListWrapped = withFilmsAmount(FilmList);
const FilmInfoNavigationWrapped = withActiveNavigationScreen(FilmInfoNavigation);

const FilmInfo = (props) => {
  const {films, film, onCardClick, onPlayClick, authorizationStatus} = props;

  const getFilmListByGenre = () => {
    return films.filter((filmItem) => {
      return filmItem.genre === film.genre && filmItem.title !== film.title;
    }).slice(0, SIMILAR_FILMS_AMOUNT_SHOW);
  };

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full" style={{background: film.backgroundColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={film.background} alt={film.title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.releaseDate}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={onPlayClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                {authorizationStatus === AuthorizationStatus.AUTH ? <a href="add-review.html" className="btn movie-card__button">Add review</a> : ``}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={film.posterInfo} alt={`${film.title} poster`}
                width="218" height="327"/>
            </div>

            <FilmInfoNavigationWrapped film={film} />

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmListWrapped films={getFilmListByGenre()} genre={film.genre} onCardClick={onCardClick} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

FilmInfo.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })).isRequired,
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    posterInfo: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired
  }),
  onCardClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

export default connect(mapStateToProps)(FilmInfo);
