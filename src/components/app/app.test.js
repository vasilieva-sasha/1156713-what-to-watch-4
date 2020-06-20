import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
import {Movie} from "../../common/mock-test";

const films = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`
}];

describe(`AppComponent`, () => {
  it(`App correct render`, () => {
    const tree = renderer.create(
        <App
          title={Movie.TITLE}
          genre={Movie.GENRE}
          date={Movie.DATE}
          films={films}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
