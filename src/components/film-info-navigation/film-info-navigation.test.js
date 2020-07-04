import React from "react";
import renderer from "react-test-renderer";
import FilmInfoNavigation from "./film-info-navigation";

describe(`FilmNavigationComponent`, () => {
  it(`Navigation bar renders correctly`, () => {
    const tree = renderer.create(
        <FilmInfoNavigation onTabClick={() => {}} />
    );

    expect(tree).toMatchSnapshot();
  });
});
