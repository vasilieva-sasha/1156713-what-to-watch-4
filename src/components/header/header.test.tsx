import * as React from "react";
import * as renderer from "react-test-renderer";
import Header from "./header";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from '../../reducer/name-space';
import {Router} from 'react-router-dom';
import history from '../../history';

const mock = {
  id: 1,
  email: ``,
  name: ``,
  avatar: ``
};

const mockStore = configureStore([]);
const store = mockStore({
  [NameSpace.USER]: {
    authorizationStatus: `NO_AUTH`,
    authInfo: null,
  },
});

describe(`HeaderComponent`, () => {
  it(`Header renders correctly with no-auth`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <Header authorizationStatus={store.authorizationStatus} authInfo={mock} currentPage={`MAIN`}/>
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Header renders correctly with auth`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <Header authorizationStatus={`AUTH`} authInfo={store.authInfo} currentPage={`MAIN`}/>
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
