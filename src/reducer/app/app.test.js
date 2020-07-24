import {reducer, ActionType} from "./app";
import {ALL_GENRES} from './../../common/consts';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: ALL_GENRES,
  });
});

it(`Reducer should change genre`, () => {
  expect(reducer({
    genre: ALL_GENRES,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Horror`,
  })).toEqual({
    genre: `Horror`,
  });
});
