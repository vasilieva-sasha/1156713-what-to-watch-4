import React from "react";
import renderer from "react-test-renderer";
import Header from "./header";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from './../../reducer/name-space';
import {Router} from 'react-router-dom';
import history from './../../history';

const mock = {
  avatar: ``
};

const mockStore = configureStore([]);
const store = mockStore({
  [NameSpace.USER]: {
    authorizationStatus: `NO_AUTH`,
    authInfo: null,
  },
  [NameSpace.APP]: {
    currentPage: `MAIN`
  }
});

describe(`HeaderComponent`, () => {
  it(`Header renders correctly with no-auth`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <Header authorizationStatus={store.authorizationStatus} authInfo={mock} currentPage={store.currentPage}/>
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Header renders correctly with no-auth`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <Header authorizationStatus={`AUTH`} authInfo={store.authInfo} currentPage={store.currentPage}/>
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
