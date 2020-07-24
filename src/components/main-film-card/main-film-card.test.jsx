import React from "react";
import renderer from "react-test-renderer";
import MainFilmCard from './main-film-card';
import configureStore from 'redux-mock-store';
import NameSpace from './../../reducer/name-space';
import {Provider} from "react-redux";

const mock = {
  title: `title`,
  genre: `genre`,
  releaseDate: 0,
  background: ``,
  posterInfo: ``
};

const mockStore = configureStore([]);

it(`Main film card renders correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      promoFilm: mock,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
    },
  });
  const tree = renderer.create(
      <Provider store={store}>
        <MainFilmCard/>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
