import React from "react";
import renderer from "react-test-renderer";
import FilmInfoDetails from "./film-info-details";

const mock = {
  director: ` `,
  actors: [`a`, `b`],
  genre: ` `,
  releaseDate: 200,
  runtime: 200
};

describe(`FilmDetailsComponent`, () => {
  it(`film Deatils render correctly`, () => {
    const tree = renderer.create(
        <FilmInfoDetails film={mock} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
