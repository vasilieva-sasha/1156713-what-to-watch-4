import {ALL_GENRES} from './../../common/consts';
import {extend} from '../../common/utils';
import filmAdapter from './../../adapter/film';

const initialState = {
  promoFilm: {
    title: `Loading`,
    genre: ``,
    releaseDate: 0,
    background: ``,
    posterInfo: ``
  },
  films: [],
  filteredFilms: [],
  serverError: false
};

const ActionType = {
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_FILMS: `LOAD_FILMS`,
  SHOW_ERROR: `SHOW_ERROR`,
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
  loadPromoFilm: (film) => {
    return {
      type: ActionType.LOAD_PROMO_FILM,
      payload: film
    };
  },
  loadFilms: (films) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: films
    };
  },
  showLoadingError: (bool) => {
    return {
      type: ActionType.SHOW_ERROR,
      payload: bool
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
    case ActionType.LOAD_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload
      });
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload
      });
    case ActionType.SHOW_ERROR:
      return extend(state, {
        serverError: action.payload
      });
    case ActionType.GET_FILMS_LIST:
      return extend(state, {
        filteredFilms: action.payload
      });
  }

  return state;
};

const Operations = {
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoFilm(filmAdapter(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.showLoadingError(true));
      });
  },
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data.map((film) => filmAdapter(film))));
      })
      .catch(() => {
        dispatch(ActionCreator.showLoadingError(true));
      });
  },
};

export {reducer, ActionCreator, ActionType, getFilteredFilms, Operations};
