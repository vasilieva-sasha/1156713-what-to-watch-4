import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {Router} from "react-router-dom";
import history from './../../history';
import configureStore from 'redux-mock-store';
import NameSpace from './../../reducer/name-space';
import {Provider} from "react-redux";

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


describe(`SingInComponent`, () => {
  it(`SingIn renders correctly`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <SignIn onSubmit={() => {}}
              singInError={false}/>
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
