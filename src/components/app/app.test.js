import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
import {Movie, TITLES} from "../../common/mock-test";

describe(`AppComponent`, () => {
  it(`App correct render`, () => {
    const tree = renderer.create(
        <App
          title={Movie.TITLE}
          genre={Movie.GENRE}
          date={Movie.DATE}
          titles={TITLES}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
