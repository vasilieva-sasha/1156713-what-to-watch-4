export const makeLetterUppercase = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};
