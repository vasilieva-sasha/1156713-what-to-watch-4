import * as React from "react";
import * as renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {Router} from "react-router-dom";
import history from '../../history';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space';
import {Provider} from "react-redux";
import {noop} from '../../common/test-data';

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.APP]: {
    genre: `All genres`,
  },
  [NameSpace.DATA]: {
    serverError: false,
  },
  [NameSpace.USER]: {
    authorizationStatus: `NO_AUTH`,
    authInfo: null,
    signInError: false
  },
});


describe(`SignInComponent`, () => {
  it(`SignIn renders correctly`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <SignIn onSubmit={noop}
              signInError={false}/>
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
