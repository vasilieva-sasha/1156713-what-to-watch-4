import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {reducer, ActionType, Operations} from "./user";
import {AuthorizationStatus} from "../../common/consts";
import userAdapter from "../../adapter/user";

const api = createAPI(() => {});

const authData = {
  id: 0,
  email: `email`,
  name: `name`,
  avatar: `https://4.react.pages.academy`
};

const loginData = {
  email: `Oliver.conner@gmail.com`,
  password: `12345678`
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

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authChecker = Operations.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return authChecker(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_AUTH_INFO,
          payload: userAdapter({fake: true}),
        });
      });
  });

  it(`Should make a correct API post call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authSender = Operations.login(loginData);

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return authSender(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_AUTH_INFO,
          payload: userAdapter({fake: true}),
        });
      });
  });

  it(`Should make an incorrect API post call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authSender = Operations.login(loginData);

    apiMock
      .onPost(`/login`)
      .reply(400, [{fake: true}]);

    return authSender(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHECK_SIGN_IN,
          payload: true,
        });
      });
  });
});
