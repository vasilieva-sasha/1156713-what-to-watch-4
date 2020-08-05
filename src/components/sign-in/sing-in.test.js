import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {Router} from "react-router-dom";
import history from './../../history';

describe(`SingInComponent`, () => {
  it(`SingIn renders correctly`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <SignIn onSubmit={() => {}}
            singInError={false}/>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
