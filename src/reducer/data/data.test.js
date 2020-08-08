import {reducer, ActionType} from "./data";

const promoFilm = {
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  genre: `Drama`,
  releaseDate: 2018,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  backgroundColor: ``,
  preview: ``,
  rating: {
    score: 8.9,
    level: `Very good`,
    count: 240
  },
  text: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  isFavorite: false
};

const films = [{
  id: 2,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  genre: `Drama`,
  releaseDate: 2018,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  backgroundColor: ``,
  preview: ``,
  rating: {
    score: 8.9,
    level: `Very good`,
    count: 240
  },
  text: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  isFavorite: false
}];

const reviews = [{
  id: 0,
  user: {
    id: 0,
    name: ``,
  },
  comment: ``,
  date: `PropTypes.string.isRequired`,
  rating: 0,
}];

const reviewData = {
  rating: 5,
  comment: `Great!`
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    promoFilm: {
      id: 0,
      title: `Loading`,
      genre: ``,
      releaseDate: 0,
      background: ``,
      posterInfo: ``,
      isFavorite: false,
    },
    films: [],
    filteredFilms: [],
    reviews: [],
    review: {},
    favoriteFilms: [],
    serverError: false,
    reviewError: false,
    reviewSent: false
  });
});

it(`Reducer should update promoFilm by load promoFilm`, () => {
  expect(reducer({
    promoFilm: {
      id: 0,
      title: `Loading`,
      genre: ``,
      releaseDate: 0,
      background: ``,
      posterInfo: ``,
      isFavorite: false
    },
  }, {
    type: ActionType.LOAD_PROMO_FILM,
    payload: promoFilm,
  })).toEqual({
    promoFilm,
  });
});

it(`Reducer should update films by load films`, () => {
  expect(reducer({
    films: [],
  }, {
    type: ActionType.LOAD_FILMS,
    payload: films,
  })).toEqual({
    films,
  });
});

it(`Reducer should update reviews by load reviews`, () => {
  expect(reducer({
    reviews: [],
  }, {
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  })).toEqual({
    reviews,
  });
});

it(`Reducer should update serverError by "show error"`, () => {
  expect(reducer({
    serverError: false,
  }, {
    type: ActionType.SHOW_ERROR,
    payload: true,
  })).toEqual({
    serverError: true,
  });
});

it(`Reducer should update favoriteFilms by loadFavoriteFilms `, () => {
  expect(reducer({
    favoriteFilms: [],
  }, {
    type: ActionType.LOAD_FAVORITE_FILMS,
    payload: films,
  })).toEqual({
    favoriteFilms: films,
  });
});

it(`Reducer should send review by sendReview`, () => {
  expect(reducer({
    review: {},
  }, {
    type: ActionType.SEND_REVIEW,
    payload: reviewData,
  })).toEqual({
    review: reviewData,
  });
});

it(`Reducer should change reveiw error status`, () => {
  expect(reducer({
    reviewError: false,
  }, {
    type: ActionType.SHOW_REVIEW_ERROR,
    payload: true,
  })).toEqual({
    reviewError: true
  });
});

it(`Reducer should change reveiw status`, () => {
  expect(reducer({
    reviewSent: false,
  }, {
    type: ActionType.CHANGE_REVIEW_STATUS,
    payload: true,
  })).toEqual({
    reviewSent: true
  });
});
