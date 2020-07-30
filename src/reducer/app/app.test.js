import {reducer, ActionType} from "./app";
import {ALL_GENRES} from './../../common/consts';

const film = {
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

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: ALL_GENRES,
    activeCard: null,
    isFullPlayerActive: false,
    currentPage: `MAIN`,
    isFormBlocked: false
  });
});

it(`Reducer should change genre`, () => {
  expect(reducer({
    genre: ALL_GENRES,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Horror`,
  })).toEqual({
    genre: `Horror`,
  });
});

it(`Reducer should change active film`, () => {
  expect(reducer({
    activeCard: null,
  }, {
    type: ActionType.CHANGE_CARD,
    payload: film,
  })).toEqual({
    activeCard: film,
  });
});

it(`Reducer should change player status`, () => {
  expect(reducer({
    isFullPlayerActive: false
  }, {
    type: ActionType.CHANGE_PLAYER_STATUS,
    payload: true,
  })).toEqual({
    isFullPlayerActive: true,
  });
});

it(`reducer should change page`, () => {
  expect(reducer({
    currentPage: `MAIN`
  }, {
    type: ActionType.CHANGE_PAGE,
    payload: `INFO`,
  })).toEqual({
    currentPage: `INFO`
  });
});

it(`reducer should change form status`, () => {
  expect(reducer({
    isFormBlocked: false
  }, {
    type: ActionType.CHANGE_FORM_STATUS,
    payload: true,
  })).toEqual({
    isFormBlocked: true
  });
});
