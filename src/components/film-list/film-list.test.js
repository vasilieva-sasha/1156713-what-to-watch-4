import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list";
import {mock} from "../../common/mock-test";

describe(`FilmListComponent`, () => {
  it(`FilmList correct render`, () => {
    const tree = renderer.create(
        <FilmList films={mock} onTitleClick={() => {}} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
