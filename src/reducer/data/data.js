import {ALL_GENRES} from './../../common/consts';
import {extend} from '../../common/utils';
import filmAdapter from './../../adapter/film';
import {ActionCreator as AppActionCreator} from '../app/app';

const initialState = {
  promoFilm: {
    id: 0,
    title: `Loading`,
    genre: ``,
    releaseDate: 0,
    background: ``,
    posterInfo: ``,
    isFavorite: false
  },
  films: [],
  filteredFilms: [],
  reviews: [],
  review: {},
  favoriteFilms: [],
  serverError: false,
  reviewError: false,
  reviewSent: false
};

const ActionType = {
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  SHOW_ERROR: `SHOW_ERROR`,
  SEND_REVIEW: `SEND_REVIEW`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
  SHOW_REVIEW_ERROR: `SHOW_REVIEW_ERROR`,
  CHANGE_REVIEW_STATUS: `CHANGE_REVIEW_STATUS`
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
  },
  loadFavoriteFilms: (films) => {
    return {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: films
    };
  },
  showReviewError: (bool) => {
    return {
      type: ActionType.SHOW_REVIEW_ERROR,
      payload: bool
    };
  },
  changeReviewStatus: (bool) => {
    return {
      type: ActionType.CHANGE_REVIEW_STATUS,
      payload: bool
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
    case ActionType.LOAD_FAVORITE_FILMS:
      return extend(state, {
        favoriteFilms: action.payload
      });
    case ActionType.SHOW_REVIEW_ERROR:
      return extend(state, {
        reviewError: action.payload
      });
    case ActionType.CHANGE_REVIEW_STATUS:
      return extend(state, {
        reviewSent: action.payload
      });
  }

  return state;
};

const Operations = {
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.showLoadingError(false));
        dispatch(ActionCreator.loadPromoFilm(filmAdapter(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.showLoadingError(true));
      });
  },
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.showLoadingError(false));
        dispatch(ActionCreator.loadFilms(response.data.map((film) => filmAdapter(film))));
      })
      .catch(() => {
        dispatch(ActionCreator.showLoadingError(true));
      });
  },
  loadReviews: (film) => (dispatch, getState, api) => {
    return api.get(`/comments/${film.id}`)
    .then((response) => {
      dispatch(ActionCreator.changeReviewStatus(false));
      dispatch(ActionCreator.showReviewError(false));
      dispatch(ActionCreator.showLoadingError(false));
      dispatch(ActionCreator.loadReviews(response.data));
    })
    .catch(() => {
      dispatch(ActionCreator.loadReviews([]));
      dispatch(ActionCreator.showLoadingError(true));
    });
  },
  sendReview: (film, reviewData) => (dispatch, getState, api) => {
    return api.post(`/comments/${film.id}`, {
      rating: reviewData.rating,
      comment: reviewData.comment,
    })
      .then(() => {
        dispatch(ActionCreator.showReviewError(false));
        dispatch(ActionCreator.sendReview(reviewData));
        dispatch(AppActionCreator.changeFormstatus(true));

      })
      .then(() => {
        dispatch(AppActionCreator.changeFormstatus(false));
        dispatch(ActionCreator.changeReviewStatus(true));
      })
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      })
      .catch(() => {
        dispatch(ActionCreator.changeReviewStatus(false));
        dispatch(AppActionCreator.changeFormstatus(false));
        dispatch(ActionCreator.showReviewError(true));
      });
  },
  loadFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.showLoadingError(false));
        dispatch(ActionCreator.loadFavoriteFilms(response.data.map((film) => filmAdapter(film))));
      })
      .catch(() => {
        dispatch(ActionCreator.showLoadingError(true));
      });
  },
  changeFavoriteStatus: (film) => (dispatch, getState, api) => {
    return api.post(`/favorite/${film.id}/${film.isFavorite ? 0 : 1}`)
    .then(() => {
      dispatch(Operations.loadFilms());
      dispatch(Operations.loadPromoFilm());
      dispatch(Operations.loadFavoriteFilms());
    })
    .catch(() => {
      dispatch(ActionCreator.showLoadingError(true));
    });
  }
};

export {reducer, ActionCreator, ActionType, getFilteredFilms, Operations};
