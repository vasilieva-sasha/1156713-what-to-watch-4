import React from "react";
import PropTypes from "prop-types";
import FilmList from "../film-list/film-list";
import GenreList from "../genre-list/genre-list";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer";
import withFilmsAmount from "../../hocs/with-films-amount/with-films-amount";
import Header from "../header/header";
import MainFilmCard from "../main-film-card/main-film-card";
import Footer from "../footer/footer";

const FilmListWrapped = withFilmsAmount(FilmList);

const Main = (props) => {
  const {title, genre, date, genres, films, onCardClick, activeGenre, onFilterClick} = props;
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

          <GenreList genres={genres} activeGenre={activeGenre} onFilterClick={onFilterClick}/>

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
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  films: PropTypes.arrayOf(
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
  films: state.filteredFilms,
  genres: state.genres,
  activeGenre: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  onFilterClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.getFilmsList(genre));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
