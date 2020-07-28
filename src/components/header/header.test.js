import React from "react";
import renderer from "react-test-renderer";
import Header from "./header";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from './../../reducer/name-space';

const mock = {
  avatar: ``
};

const mockStore = configureStore([]);
const store = mockStore({
  [NameSpace.USER]: {
    authorizationStatus: `NO_AUTH`,
    authInfo: null,
  },
});
it(`Header renders correctly with no-auth`, () => {
  const tree = renderer.create(
      <Provider store={store}>
        <Header authorizationStatus={store.authorizationStatus} onLoginClick={() => {}} authInfo={mock}/>
      </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Header renders correctly with no-auth`, () => {
  const tree = renderer.create(
      <Provider store={store}>
        <Header authorizationStatus={`AUTH`} onLoginClick={() => {}} authInfo={store.authInfo}/>
      </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});
