import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.APP;

export const getGenre = (state) => {
  return state[NAME_SPACE].genre;
};

export const getFormStatus = (state) => {
  return state[NAME_SPACE].isFormBlocked;
};
