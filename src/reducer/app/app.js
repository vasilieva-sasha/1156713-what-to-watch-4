import {ALL_GENRES, CurrentPage} from './../../common/consts';
import {extend} from './../../common/utils';

const initialState = {
  genre: ALL_GENRES,
  activeCard: null,
  isFullPlayerActive: false,
  currentPage: CurrentPage.MAIN,
  isFormBlocked: false
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_CARD: `CHANGE_CARD`,
  CHANGE_PLAYER_STATUS: `CHANGE_PLAYER_STATUS`,
  CHANGE_PAGE: `CHANGE_PAGE`,
  CHANGE_FORM_STATUS: `CHANGE_FORM_STATUS`
};

const ActionCreator = {
  changeGenre: (genre) => {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: genre
    };
  },
  changeCard: (film) => {
    return {
      type: ActionType.CHANGE_CARD,
      payload: film
    };
  },
  changePlayerStatus: (bool) => {
    return {
      type: ActionType.CHANGE_PLAYER_STATUS,
      payload: bool
    };
  },
  changePage: (page) => {
    return {
      type: ActionType.CHANGE_PAGE,
      payload: page
    };
  },
  changeFormstatus: (bool) => {
    return {
      type: ActionType.CHANGE_FORM_STATUS,
      payload: bool
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });
    case ActionType.CHANGE_CARD:
      return extend(state, {
        activeCard: action.payload
      });
    case ActionType.CHANGE_PLAYER_STATUS:
      return extend(state, {
        isFullPlayerActive: action.payload
      });
    case ActionType.CHANGE_PAGE:
      return extend(state, {
        currentPage: action.payload
      });
    case ActionType.CHANGE_FORM_STATUS:
      return extend(state, {
        isFormBlocked: action.payload
      });
  }

  return state;
};

export {reducer, ActionCreator, ActionType};
