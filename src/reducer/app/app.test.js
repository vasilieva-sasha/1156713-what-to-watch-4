import {reducer, ActionType} from "./app";
import {ALL_GENRES} from './../../common/consts';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: ALL_GENRES,
    isFormBlocked: false
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


it(`reducer should change form status`, () => {
  expect(reducer({
    isFormBlocked: false
  }, {
    type: ActionType.CHANGE_FORM_STATUS,
    payload: true,
  })).toEqual({
    isFormBlocked: true
  });
});
