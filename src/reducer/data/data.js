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
  reviews: [],
  review: {},
  serverError: false
};

const ActionType = {
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  SHOW_ERROR: `SHOW_ERROR`,
  SEND_REVIEW: `SEND_REVIEW`
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
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews
    };
  },
  showLoadingError: (bool) => {
    return {
      type: ActionType.SHOW_ERROR,
      payload: bool
    };
  },
  sendReview: (review) => {
    return {
      type: ActionType.SEND_REVIEW,
      payload: review
    };
  }
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
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload
      });
    case ActionType.SHOW_ERROR:
      return extend(state, {
        serverError: action.payload
      });
    case ActionType.SEND_REVIEW:
      return extend(state, {
        review: action.payload
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
  loadReviews: (film) => (dispatch, getState, api) => {
    return api.get(`/comments/${film.id}`)
    .then((response) => {
      dispatch(ActionCreator.loadReviews(response.data));
    })
    .catch(() => {
      dispatch(ActionCreator.loadReviews([]));
    });
  },
  sendReview: (film, reviewData) => (dispatch, getState, api) => {
    return api.post(`/comments/${film.id}`, {
      rating: reviewData.rating,
      comment: reviewData.comment,
    })
      .then(() => {
        dispatch(ActionCreator.sendReview(reviewData));
      })
      .catch((err) => {
        throw err;
      });
  },
};

export {reducer, ActionCreator, ActionType, getFilteredFilms, Operations};
