import {ALL_GENRES, Rating, Score} from "./consts";

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

export const getRatingLevel = (rating) => {
  switch (true) {
    case rating <= Score.BAD:
      return Rating.BAD;
    case rating > Score.BAD && rating <= Score.NORMAL:
      return Rating.NORMAL;
    case rating > Score.NORMAL && rating <= Score.VERY_GOOD:
      return Rating.GOOD;
    case rating < Score.VERY_GOOD && rating < Score.AWESOME:
      return Rating.VERY_GOOD;
    case rating === Score.AWESOME:
      return Rating.AWESOME;
  }
    
  // [Rating.BAD]: (rating) => rating >= Score.BAD,
  // [Rating.NORMAL]: (rating) => rating < Score.BAD || rating >= Score.NORMAL,
  // [Rating.GOOD]: (rating) => rating < Score.NORMAL || rating >= Score.VERY_GOOD,
  // [Rating.VERY_GOOD]: (rating) => rating < Score.VERY_GOOD || rating > Score.AWESOME,
  // [Rating.AWESOME]: (rating) => rating === Score.AWESOME
};
