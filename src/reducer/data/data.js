import {ALL_GENRES} from './../../common/consts';
import {extend} from '../../common/utils';
import filmAdapter from './../../adapter/film';

const initialState = {
  films: [],
  filteredFilms: [],
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
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
  loadFilms: (films) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: films
    };
  },
  getFilmsList: (films, genre) => {
    const filteredByGengeFilms = getFilteredFilms(films, genre);
    return {
      type: ActionType.GET_FILMS_LIST,
      payload: filteredByGengeFilms
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload
      });
    case ActionType.GET_FILMS_LIST:
      return extend(state, {
        filteredFilms: action.payload
      });
  }

  return state;
};

const Operations = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data.map((film) => filmAdapter(film))));
      });
  },
};

export {reducer, ActionCreator, ActionType, getFilteredFilms, Operations};
