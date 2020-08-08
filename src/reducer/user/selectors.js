import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

export const getAuthInfo = (state) => {
  return state[NAME_SPACE].authInfo;
};

export const getSignInErrorStatus = (state) => {
  return state[NAME_SPACE].signInError;
};
