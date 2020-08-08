import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import userAdapter from "../../adapter/user";
import {ActionType, Operations} from "./user";

const api = createAPI(() => {});

const loginData = {
  email: `Oliver.conner@gmail.com`,
  password: `12345678`
};

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
        expect(dispatch).toHaveBeenCalledTimes(3);
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
        expect(dispatch).toHaveBeenCalledTimes(4);
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
