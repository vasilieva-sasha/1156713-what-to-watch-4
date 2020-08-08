import * as React from "react";
import * as renderer from "react-test-renderer";
import {FilmInfo} from "./film-info";
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space';
import {Router} from "react-router-dom";
import history from '../../history';
import {noop, films, film} from "../../common/test-data";

const mockStore = configureStore([]);

describe(`FilmInfoComponent`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      genre: `All genres`,
      activeCard: null,
    },
    [NameSpace.DATA]: {
      films
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
    },
  });

  it(`FilmInfo correct render no-auth`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <FilmInfo films={films} film={film} authorizationStatus={`NO_AUTH`} loadReviews={noop}/>
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`FilmInfo correct render with auth`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <FilmInfo films={films} film={film} authorizationStatus={`AUTH`} loadReviews={noop}/>
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
