import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in";
import {Router} from "react-router-dom";
import history from './../../history';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import NameSpace from './../../reducer/name-space';

Enzyme.configure({
  adapter: new Adapter()
});

const mock = {
  login: `example@mail.ru`,
  password: `fhhjg`
};

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


describe(`singInComponent`, () => {
  it(`Submit login`, () => {
    const onSubmit = jest.fn();
    const singIn = mount(
        <Router history={history}>
          <Provider store={store}>
            <SignIn onSubmit={onSubmit} singInError={false} />
          </Provider>

        </Router>
    );

    const {loginRef} = singIn.instance();
    loginRef.current.value = mock.login;

    const {passwordRef} = singIn.instance();
    passwordRef.current.value = mock.password;

    const form = singIn.find(`form`);

    form.simulate(`submit`);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(mock);
  });

});
