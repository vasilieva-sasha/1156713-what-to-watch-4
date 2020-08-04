import React from "react";
import PropTypes from "prop-types";
import FilmList from "../film-list/film-list";
import GenreList from "../genre-list/genre-list";
import {connect} from "react-redux";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import MainFilmCard from "../main-film-card/main-film-card";
import Footer from "../footer/footer";
import {getGenres} from './../../common/utils';
import {getFilms, getFilteredByGenreFilms} from "../../reducer/data/selectors";
import {getGenre} from './../../reducer/app/selectors';
import withShowMoreButton from "../../hocs/with-show-more-button/with-show-more-button";

const FilmListWrapped = withShowMoreButton(FilmList);

const Main = (props) => {
  const {films, allFilms, onCardClick, activeGenre, onFilterClick} = props;

  return (
    <React.Fragment>

      <MainFilmCard/>

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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
