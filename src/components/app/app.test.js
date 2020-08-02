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
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  isFavorite: true
}];

const mockStore = configureStore([]);

describe(`AppComponent`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      genre: `All genres`,
      activeCard: null,
      isFullPlayerActive: false,
      currentPage: `MAIN`
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

  it(`App main page correct render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            films={store.films}
            serverError={store.serverError}
            isFullPlayerActive={false}
            promoFilm={store.promoFilm}
            selectedFilm={null}
            onCardClick={() => {}}
            currentPage={store.currentPage}
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

  it(`App movie page correct render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            films={store.films}
            serverError={store.serverError}
            isFullPlayerActive={false}
            promoFilm={store.promoFilm}
            selectedFilm={films[0]}
            onCardClick={() => {}}
            currentPage={`INFO`}
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

  it(`App movie page review correct render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            films={store.films}
            serverError={store.serverError}
            isFullPlayerActive={false}
            promoFilm={store.promoFilm}
            selectedFilm={films[0]}
            onCardClick={() => {}}
            currentPage={`REVIEW`}
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

  it(`App movie page correct render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            films={store.films}
            serverError={store.serverError}
            isFullPlayerActive={false}
            promoFilm={store.promoFilm}
            selectedFilm={films[0]}
            onCardClick={() => {}}
            currentPage={`LOGIN`}
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

  it(`App Loading Error page correct render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            films={store.films}
            serverError={true}
            isFullPlayerActive={false}
            promoFilm={store.promoFilm}
            selectedFilm={films[0]}
            onCardClick={() => {}}
            currentPage={`MAIN`}
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

  it(`App Player page correct render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            films={store.films}
            serverError={false}
            isFullPlayerActive={true}
            promoFilm={store.promoFilm}
            selectedFilm={null}
            onCardClick={() => {}}
            currentPage={`MAIN`}
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
