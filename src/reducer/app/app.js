import {ALL_GENRES} from './../../common/consts';
import {extend} from './../../common/utils';

const initialState = {
  genre: ALL_GENRES,
  isFormBlocked: false
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_FORM_STATUS: `CHANGE_FORM_STATUS`
};

const ActionCreator = {
  changeGenre: (genre) => {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: genre
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
    case ActionType.CHANGE_FORM_STATUS:
      return extend(state, {
        isFormBlocked: action.payload
      });
  }

  return state;
};

export {reducer, ActionCreator, ActionType};
