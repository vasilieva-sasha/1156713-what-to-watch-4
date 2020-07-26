import {reducer, ActionType} from "./app";
import {ALL_GENRES} from './../../common/consts';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: ALL_GENRES,
    isFullPlayerActive: false
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

it(`Reducer should change player status`, () => {
  expect(reducer({
    isFullPlayerActive: false
  }, {
    type: ActionType.CHANGE_PLAYER_STATUS,
    payload: true,
  })).toEqual({
    isFullPlayerActive: true,
  });
});
