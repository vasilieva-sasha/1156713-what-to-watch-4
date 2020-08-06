import * as React from "react";
import FilmList from "../film-list/film-list";
import GenreList from "../genre-list/genre-list";
import {connect} from "react-redux";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import MainFilmCard from "../main-film-card/main-film-card";
import Footer from "../footer/footer";
import {getGenres} from '../../common/utils';
import {getFilms, getFilteredByGenreFilms} from "../../reducer/data/selectors";
import {getGenre} from '../../reducer/app/selectors';
import withShowMoreButton from "../../hocs/with-show-more-button/with-show-more-button";
import {CurrentPage} from '../../common/consts';
import {Film} from "../../types";

interface Props {
  films: Array<Film>;
  allFilms: Array<Film>;
  activeGenre: string;
  onFilterClick: (films: Array<Film>, genre: string) => void;
}

const FilmListWrapped = withShowMoreButton(FilmList);

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {films, allFilms, activeGenre, onFilterClick} = props;

  return (
    <React.Fragment>

      <MainFilmCard/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList films={allFilms} genres={getGenres(allFilms)} activeGenre={activeGenre} onFilterClick={onFilterClick}/>

          <FilmListWrapped films={films} genre={activeGenre}/>

        </section>

        <Footer currentPage={CurrentPage.MAIN}/>

      </div>
    </React.Fragment>
  );
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
