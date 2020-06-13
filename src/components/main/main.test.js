import React from "react";
import renderer from "react-test-renderer";
import {Main} from "./main";
import {Movie, TITLES} from "../../common/mock-test";

describe(`MainComponent`, () => {
  it(`Main correct render`, () => {
    const tree = renderer
    .create(
        <Main
          title={Movie.TITLE}
          genre={Movie.GENRE}
          date={Movie.DATE}
          titles={TITLES}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
