import * as React from "react";
import * as renderer from "react-test-renderer";
import LoadingScreen from "./loading-screen";
import {Router} from "react-router-dom";
import history from '../../history';


it(`LoadingScreen`, () => {
  const tree = renderer.create(<Router history={history}><LoadingScreen /></Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
