import {ALL_GENRES, Rating, Score, MINUTES_IN_HOUR} from "./consts";

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
  return null;
};

export const getFilmDuration = (runtime) => {
  const hours = Math.floor(runtime / MINUTES_IN_HOUR);
  const minutes = runtime % MINUTES_IN_HOUR;
  const filmDuration = `${hours}h ${minutes}m`;
  return filmDuration;
};
