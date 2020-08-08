import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main";
import NameSpace from '../../reducer/name-space';
import {Router} from "react-router-dom";
import history from '../../history';
import {films} from "../../common/test-data";

const genres = [`All genres`, `Comedy`, `Horror`, `Family`];

const mockStore = configureStore([]);

describe(`MainComponent`, () => {
  it(`Main correct render`, () => {
    const store = mockStore({
      [NameSpace.APP]: {
        genre: `All genres`,
        activeCard: null,
      },
      [NameSpace.DATA]: {
        promoFilm: films[0],
        films,
        filteredFilms: films
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
      },
    });

    const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <Main
              genres={genres}
              films={store.filteredFilms}
              activeGenre={store.genre}
            />
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
