import {ALL_GENRES} from "../common/consts";
import {extend, getGenres} from "../common/utils";
import films from "../common/mock/films";

const initialState = {
  activeCard: null,
  genre: ALL_GENRES,
  genres: getGenres(films),
  films,
  filteredFilms: films
};

const ActionType = {
  CHANGE_CARD: `CHANGE_CARD`,
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_FILMS_LIST: `GET_FILMS_LIST`,
};

const getFilteredFilms = (filmsList, genre) => {
  if (genre === ALL_GENRES) {
    return filmsList;
  } else {
    return filmsList.filter((film) => film.genre === genre);
  }
};

const ActionCreator = {
  changeCard: (film) => {
    return {
      type: ActionType.CHANGE_CARD,
      payload: film
    };
  },

  changeGenre: (genre) => {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: genre
    };
  },

  getFilmsList: (genre) => {
    const filteredByGengeFilms = getFilteredFilms(films, genre);
    return {
      type: ActionType.GET_FILMS_LIST,
      payload: filteredByGengeFilms
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CARD:
      return extend(state, {
        activeCard: action.payload
      });
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });
    case ActionType.GET_FILMS_LIST:
      return extend(state, {
        filteredFilms: action.payload
      });
  }

  return state;
};

export {reducer, ActionCreator, ActionType, getFilteredFilms};
