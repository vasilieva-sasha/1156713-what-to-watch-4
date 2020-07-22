import React from "react";
import renderer from "react-test-renderer";
import {Review} from "./review";

const mock = {
  id: 0,
  author: ``,
  text: ``,
  date: ``,
  rating: ``,
};

describe(`ReviewComponent`, () => {
  it(`review component renders correctly`, () => {
    const tree = renderer.create(
        <Review review={mock} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
