import {reducer, ActionType} from "./user";
import {AuthorizationStatus} from "../../common/consts";

const authData = {
  id: 0,
  email: `email`,
  name: `name`,
  avatar: `https://4.react.pages.academy`
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    authInfo: null,
    signInError: false
  });
});

it(`Reducer should change authorization status`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });
});

it(`Reducer should load auth info`, () => {
  expect(reducer({
    authInfo: null,
  }, {
    type: ActionType.LOAD_AUTH_INFO,
    payload: authData,
  })).toEqual({
    authInfo: authData,
  });
});

it(`Reducer should check sign in`, () => {
  expect(reducer({
    signInError: false,
  }, {
    type: ActionType.CHECK_SIGN_IN,
    payload: true,
  })).toEqual({
    signInError: true,
  });
});
