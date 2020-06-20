import React from "react";
import renderer from "react-test-renderer";
import {Main} from "./main";
import {Movie, mock} from "../../common/mock-test";

describe(`MainComponent`, () => {
  it(`Main correct render`, () => {
    const tree = renderer
    .create(
        <Main
          title={Movie.TITLE}
          genre={Movie.GENRE}
          date={Movie.DATE}
          films={mock}
          onTitleClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
