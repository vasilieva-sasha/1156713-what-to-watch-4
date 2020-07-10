import React from "react";
import renderer from "react-test-renderer";
import FilmInfoReviews from "./film-info-reviews";

const mock = {
  reviews: [0, 1]
};

describe(`ReviewsComponent`, () => {
  it(`film reviews component renders correctly`, () => {
    const tree = renderer.create(
        <FilmInfoReviews film={mock} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
