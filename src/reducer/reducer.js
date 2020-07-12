import {ALL_GENRES} from "../common/consts";
import {extend} from "../common/utils";
import films from "../common/mock/films";

const initialState = {
  genre: ALL_GENRES,
  films
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_FILMS_LIST: `GET_FILMS_LIST`
};

const getFilteredFilms = (genre) => {
  if (genre === ALL_GENRES) {
    return films;
  } else {
    return films.filter((film) => film.genre === genre);
  }
};

const ActionCreator = {
  changeGenre: (genre) => {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: genre
    };
  },

  getFilmsList: (genre) => {
    return {
      type: ActionType.GET_FILMS_LIST,
      payload: getFilteredFilms(genre)
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });
    case ActionType.GET_FILMS_LIST:
      return extend(state, {
        films: action.payload
      });
  }

  return state;
};

export {reducer, ActionCreator, ActionType, getFilteredFilms};
