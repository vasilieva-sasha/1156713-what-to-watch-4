import React from "react";
import renderer from "react-test-renderer";
import LoadErrorScreen from "./load-error-screen";

it(`LoadErrorScreen`, () => {
  const tree = renderer.create(<LoadErrorScreen />).toJSON();

  expect(tree).toMatchSnapshot();
});
