import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {reducer, ActionType, Operations} from "./data";
import filmAdapter from './../../adapter/film';

const api = createAPI(() => {});

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
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`]
};

const films = [{
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
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`]
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

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    promoFilm: {
      title: `Loading`,
      genre: ``,
      releaseDate: 0,
      background: ``,
      posterInfo: ``
    },
    films: [],
    filteredFilms: [],
    reviews: [],
    review: {},
    serverError: false
  });
});

it(`Reducer should update promoFilm by load promoFilm`, () => {
  expect(reducer({
    promoFilm: {
      title: `Loading`,
      genre: ``,
      releaseDate: 0,
      background: ``,
      posterInfo: ``
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

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoFilmLoader = Operations.loadPromoFilm();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return promoFilmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: filmAdapter({fake: true}),
        });
      });
  });

  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operations.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_FILMS,
          payload: [filmAdapter({fake: true})],
        });
      });
  });

  it(`Should make a correct API call to /comments/film_id`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operations.loadReviews(promoFilm);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_REVIEWS,
          payload: [{fake: true}],
        });
      });
  });
});
