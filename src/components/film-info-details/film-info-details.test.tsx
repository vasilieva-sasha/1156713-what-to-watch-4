import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmInfoDetails from "./film-info-details";
import {film} from "../../common/test-data";

describe(`FilmDetailsComponent`, () => {
  it(`film Deatils render correctly`, () => {
    const tree = renderer.create(
        <FilmInfoDetails film={film} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
