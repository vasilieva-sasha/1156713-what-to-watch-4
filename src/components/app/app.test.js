import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
import {Movie, mock} from "../../common/mock-test";

describe(`AppComponent`, () => {
  it(`App correct render`, () => {
    const tree = renderer.create(
        <App
          title={Movie.TITLE}
          genre={Movie.GENRE}
          date={Movie.DATE}
          films={mock}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
