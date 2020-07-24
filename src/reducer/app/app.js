import {ALL_GENRES} from './../../common/consts';
import {extend} from './../../common/utils';

const initialState = {
  genre: ALL_GENRES,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const ActionCreator = {
  changeGenre: (genre) => {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: genre
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });
  }

  return state;
};

export {reducer, ActionCreator, ActionType};
