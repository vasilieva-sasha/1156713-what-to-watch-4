import {ALL_GENRES} from "./consts";

export const makeLetterUppercase = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getGenres = (films) => {
  return films.reduce((filmGenres, film) => {
    if (!filmGenres.includes(film.genre)) {
      filmGenres.push(film.genre);
    }
    return filmGenres;
  }, [ALL_GENRES]);
};
