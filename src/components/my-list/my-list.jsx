import React from "react";
import Header from './../header/header';
import FilmList from "../film-list/film-list";
import Footer from "../footer/footer";
import {ALL_GENRES, CurrentPage} from './../../common/consts';
import PropTypes from 'prop-types';

const MyList = (props) => {
  const {films, onCardClick} = props;

  return (
    <div className="user-page">
      <Header currentPage={CurrentPage.MYLIST}/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList shownFilms={films} genre={ALL_GENRES} onCardClick={onCardClick} />
      </section>

      <Footer />
    </div>
  );
};

MyList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        poster: PropTypes.string,
        isFavorite: PropTypes.bool.string
      }))
  .isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default MyList;
