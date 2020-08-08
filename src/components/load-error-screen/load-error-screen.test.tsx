import * as React from "react";
import * as renderer from "react-test-renderer";
import LoadErrorScreen from "./load-error-screen";
import {Router} from "react-router-dom";
import history from '../../history';

it(`LoadErrorScreen`, () => {
  const tree = renderer.create(<Router history={history}><LoadErrorScreen /></Router>).toJSON();

  expect(tree).toMatchSnapshot();
});
