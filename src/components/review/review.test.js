import React from "react";
import renderer from "react-test-renderer";
import Review from "./review";

const mock = {
  id: 0,
  user: {
    id: 0,
    name: ``,
  },
  comment: ``,
  date: `2020-07-09T16:06:01.831Z`,
  rating: 0,
};

describe(`ReviewComponent`, () => {
  it(`review component renders correctly`, () => {
    const tree = renderer.create(
        <Review review={mock} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
