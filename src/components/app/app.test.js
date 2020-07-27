import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app";
import NameSpace from "../../reducer/name-space.js";

const films = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  genre: `Drama`,
  releaseDate: 2018,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  backgroundColor: ``,
  preview: ``,
  rating: {
    score: 8.9,
    level: `Very good`,
    count: 240
  },
  text: `text`,
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`]
}];

const mockStore = configureStore([]);

describe(`AppComponent`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      genre: `All genres`,
      activeCard: null,
    },
    [NameSpace.DATA]: {
      promoFilm: films[0],
      films,
      filteredFilms: films,
      serverError: false
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
    },
  });

  it(`App main page correct render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            selectedFilm={null}
            onCardClick={() => {}}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`App movie page correct render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            selectedFilm={films[0]}
            onCardClick={() => {}}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
