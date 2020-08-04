import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app";
import NameSpace from "../../reducer/name-space.js";

const films = [{
  id: 1,
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
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  isFavorite: true
}];

const mockStore = configureStore([]);

describe(`AppComponent`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      genre: `All genres`,
    },
    [NameSpace.DATA]: {
      promoFilm: films[0],
      films,
      filteredFilms: films,
      serverError: false,
      favoriteFilms: films
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      authInfo: null,
      signInError: false
    },
  });

  it(`App correct render no-auth`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            films={store.films}
            serverError={store.serverError}
            login={() => {}}
            onSignIn={() => {}}
            singInError={false}
            favoriteFilms={store.favoriteFilms}
            authorizationStatus={store.authorizationStatus}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`App correct render with auth`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            films={store.films}
            serverError={store.serverError}
            login={() => {}}
            onSignIn={() => {}}
            singInError={false}
            favoriteFilms={store.favoriteFilms}
            authorizationStatus={`AUTH`}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`App correct render with error`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            films={store.films}
            serverError={true}
            login={() => {}}
            onSignIn={() => {}}
            singInError={false}
            favoriteFilms={store.favoriteFilms}
            authorizationStatus={store.authorizationStatus}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
