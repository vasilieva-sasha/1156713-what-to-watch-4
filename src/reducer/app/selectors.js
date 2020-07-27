import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.APP;

export const getGenre = (state) => {
  return state[NAME_SPACE].genre;
};

export const getActiveCard = (state) => {
  return state[NAME_SPACE].activeCard;
};

export const getPlayerStatus = (state) => {
  return state[NAME_SPACE].isFullPlayerActive;
};
