import React from "react";
import PropTypes from "prop-types";
import FilmList from "../film-list/film-list";
import GenreList from "../genre-list/genre-list";
import {connect} from "react-redux";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data";
import withFilmsAmount from "../../hocs/with-films-amount/with-films-amount";
import Header from "../header/header";
import MainFilmCard from "../main-film-card/main-film-card";
import Footer from "../footer/footer";
import {getGenres} from './../../common/utils';
import {getFilms, getFilteredByGenreFilms} from "../../reducer/data/selectors";
import {getGenre} from './../../reducer/app/selectors';

const FilmListWrapped = withFilmsAmount(FilmList);

const Main = (props) => {
  const {title, genre, date, films, allFilms, onCardClick, activeGenre, onFilterClick} = props;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt={title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        <MainFilmCard title={title} genre={genre} date={date}/>

      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList films={allFilms} genres={getGenres(allFilms)} activeGenre={activeGenre} onFilterClick={onFilterClick}/>

          <FilmListWrapped films={films} genre={activeGenre} onCardClick={onCardClick}/>

        </section>

        <Footer />

      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        poster: PropTypes.string
      }))
    .isRequired,
  allFilms: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        poster: PropTypes.string
      }))
  .isRequired,
  onCardClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  allFilms: getFilms(state),
  films: getFilteredByGenreFilms(state),
  activeGenre: getGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFilterClick(films, genre) {
    dispatch(AppActionCreator.changeGenre(genre));
    dispatch(DataActionCreator.getFilmsList(films, genre));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
