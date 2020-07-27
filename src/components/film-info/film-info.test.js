import React from "react";
import renderer from "react-test-renderer";
import FilmInfo from "./film-info";
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from './../../reducer/name-space';

const mockStore = configureStore([]);

const films = [
  {
    title: `a`,
    genre: `Drama`,
    poster: `fantastic-beasts-the-crimes-of-grindelwald`,
    preview: ``,
    background: ``,
    backgroundColor: ``
  },
  {
    title: `b`,
    genre: `Drama`,
    poster: `fantastic-beasts-the-crimes-of-grindelwald`,
    preview: ``,
    background: ``,
    backgroundColor: ``
  }
];


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

describe(`FilmInfoComponent`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      films
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
    },
  });

  it(`FilmInfo correct render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <FilmInfo films={films} film={film} onCardClick={() => {}} onPlayClick={() => {}}/>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
