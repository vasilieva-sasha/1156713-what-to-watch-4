import React from "react";
import renderer from "react-test-renderer";
import LoadingScreen from "./loading-screen";


it(`LoadingScreen`, () => {
  const tree = renderer.create(<LoadingScreen />).toJSON();

  expect(tree).toMatchSnapshot();
});
