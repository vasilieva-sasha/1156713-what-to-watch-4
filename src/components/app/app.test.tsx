import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app";
import NameSpace from "../../reducer/name-space.js";
import {noop, films} from "../../common/test-data";

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
      favoriteFilms: films,
      reviewSent: false
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
            login={noop}
            onSignIn={noop}
            signInError={false}
            favoriteFilms={store.favoriteFilms}
            authorizationStatus={store.authorizationStatus}
            isReviewSent={false}
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
            login={noop}
            onSignIn={noop}
            signInError={false}
            favoriteFilms={store.favoriteFilms}
            authorizationStatus={`AUTH`}
            isReviewSent={false}
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
            login={noop}
            onSignIn={noop}
            signInError={false}
            favoriteFilms={store.favoriteFilms}
            authorizationStatus={store.authorizationStatus}
            isReviewSent={false}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
