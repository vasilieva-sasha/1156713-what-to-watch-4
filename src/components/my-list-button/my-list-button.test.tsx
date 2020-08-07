import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from 'redux-mock-store';
import {Provider} from "react-redux";
import MyListButton from "./my-list-button";
import NameSpace from '../../reducer/name-space';
import {noop, films} from "../../common/test-data";


const mockStore = configureStore([]);
const store = mockStore({
  [NameSpace.DATA]: {
    films
  },
  [NameSpace.USER]: {
    authorizationStatus: `AUTH`
  }
});

describe(`MyListButtonComponent`, () => {
  it(`MyListButtonComponent in list`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <MyListButton film={films[1]} handleChangeFavoriteStatus={noop} authorizationStatus={store.authorizationStatus}/>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`MyListButtonComponent not in list`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <MyListButton film={films[0]} handleChangeFavoriteStatus={noop} authorizationStatus={store.authorizationStatus}/>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
