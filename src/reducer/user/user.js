import {AuthorizationStatus} from "../../common/consts";
import {extend} from "../../common/utils";
import userAdapter from './../../adapter/user';
import {Operations as DataOperations} from '../data/data';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: null,
  signInError: false
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_AUTH_INFO: `LOAD_AUTH_INFO`,
  CHECK_SIGN_IN: `CHECK_SIGN_IN`
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  loadAuthInfo: (info) => {
    return {
      type: ActionType.LOAD_AUTH_INFO,
      payload: info
    };
  },
  checkSignIn: (bool) => {
    return {
      type: ActionType.CHECK_SIGN_IN,
      payload: bool
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.LOAD_AUTH_INFO:
      return extend(state, {
        authInfo: action.payload
      });
    case ActionType.CHECK_SIGN_IN:
      return extend(state, {
        signInError: action.payload
      });
  }

  return state;
};

const Operations = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.loadAuthInfo(userAdapter(response.data)));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(DataOperations.loadFavoriteFilms());
      })
      .catch(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.loadAuthInfo(userAdapter(response.data)));
        dispatch(ActionCreator.checkSignIn(false));
        dispatch(DataOperations.loadFavoriteFilms());
      })
      .catch(() => {
        dispatch(ActionCreator.checkSignIn(true));
      });
  },
};

export {ActionCreator, ActionType, reducer, Operations};
