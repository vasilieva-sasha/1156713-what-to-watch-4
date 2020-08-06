import * as React from "react";
import Header from '../header/header';
import FilmList from "../film-list/film-list";
import Footer from "../footer/footer";
import {ALL_GENRES, CurrentPage} from '../../common/consts';
import { Film } from "../../types";

interface Props {
  films: Array<Film>;
}

const MyList: React.FunctionComponent<Props> = (props: Props) => {
  const {films} = props;

  return (
    <div className="user-page">
      <Header currentPage={CurrentPage.MYLIST}/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList shownFilms={films} genre={ALL_GENRES}/>
      </section>

      <Footer />
    </div>
  );
};

export default MyList;
