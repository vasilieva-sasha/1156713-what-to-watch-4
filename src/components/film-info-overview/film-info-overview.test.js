import React from "react";
import renderer from "react-test-renderer";
import FilmInfoOverview from "./film-info-overview";

const mock = {
  id: 1,
  rating: {
    score: 8,
    level: ` `,
    count: 200
  },
  text: `text`,
  director: `director`,
  actors: [`actor`, `actor`]
};

describe(`FilmOverviewComponent`, () => {
  it(`Overview renders correctly`, () => {
    const tree = renderer.create(
        <FilmInfoOverview film={mock} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
