import React from "react";
import renderer from "react-test-renderer";
import MainFilmCard from './main-film-card';
import configureStore from 'redux-mock-store';
import NameSpace from './../../reducer/name-space';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from './../../history';

const mock = {
  title: `title`,
  genre: `genre`,
  releaseDate: 0,
  background: ``,
  posterInfo: ``,
  isFavorite: false
};

const mockStore = configureStore([]);

it(`Main film card renders correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      genre: `All genres`,
      activeCard: null,
      isFullPlayerActive: false,
      currentPage: `MAIN`
    },
    [NameSpace.DATA]: {
      promoFilm: mock,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
    },
  });
  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <MainFilmCard onPlayClick={() => {}}/>
        </Provider>
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
