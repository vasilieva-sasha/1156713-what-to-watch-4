import React from "react";
import renderer from "react-test-renderer";
import MyList from "./my-list";
import configureStore from 'redux-mock-store';
import NameSpace from './../../reducer/name-space';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from './../../history';

const films = [{
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  preview: ``
}];

const mockStore = configureStore([]);
const store = mockStore({
  [NameSpace.USER]: {
    authorizationStatus: `NO_AUTH`,
    authInfo: null,
  },
});

describe(`MyListComponent`, () => {
  it(`My List renders correctly`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <MyList films={films}/>
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
