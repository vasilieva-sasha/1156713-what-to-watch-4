import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in";

describe(`SingInComponent`, () => {
  it(`SingIn renders correctly`, () => {
    const tree = renderer.create(
        <SignIn onSubmit={() => {}}
          onSignIn={() => {}}
          singInError={false}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
