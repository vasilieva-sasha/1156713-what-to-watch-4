import * as React from "react";
import * as renderer from "react-test-renderer";
import MainFilmCard from './main-film-card';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from '../../history';
import {film} from "../../common/test-data";

const mockStore = configureStore([]);

it(`Main film card renders correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      genre: `All genres`,
      activeCard: null,
    },
    [NameSpace.DATA]: {
      promoFilm: film,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
    },
  });
  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <MainFilmCard film={film}/>
        </Provider>
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
