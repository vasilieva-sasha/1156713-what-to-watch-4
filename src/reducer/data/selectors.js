import NameSpace from "../name-space.js";
import {createSelector} from 'reselect';
import {getFilteredFilms} from "./data.js";

export const getServerError = (state) => {
  return state[NameSpace.DATA].serverError;
};

export const getPromo = (state) => {
  return state[NameSpace.DATA].promoFilm;
};

export const getFilms = (state) => {
  return state[NameSpace.DATA].films;
};

const getGenre = (state) => {
  return state[NameSpace.APP].genre;
};

export const getFilteredByGenreFilms = createSelector(
    getFilms,
    getGenre,
    (resultOne, resultTwo) => {
      return getFilteredFilms(resultOne, resultTwo);
    }
);
