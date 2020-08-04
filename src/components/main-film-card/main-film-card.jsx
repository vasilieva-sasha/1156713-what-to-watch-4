import React from "react";
import PropTypes from 'prop-types';
import {getPromo} from './../../reducer/data/selectors';
import {connect} from "react-redux";
import Header from './../header/header';
import MyListButton from './../my-list-button/my-list-button';
import {Link} from 'react-router-dom';
import {AppRoute, CurrentPage} from '../../common/consts';

const MainFilmCard = (props) => {
  const {film} = props;
  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={film.background} alt={film.title}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header currentPage={CurrentPage.MAIN}/>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={film.posterInfo} alt={`${film.title} poster`} width="218" height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{film.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{film.genre}</span>
              <span className="movie-card__year">{film.releaseDate}</span>
            </p>

            <div className="movie-card__buttons">
              <Link to={`${AppRoute.FILM}/${film.id}${AppRoute.PLAYER}`} className="btn btn--play movie-card__button" type="button" >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Link>
              <MyListButton film={film} />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

MainFilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    background: PropTypes.string.isRequired,
    posterInfo: PropTypes.string.isRequired,
  }).isRequired,
  // onPlayClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: getPromo(state)
});

export default connect(mapStateToProps)(MainFilmCard);
