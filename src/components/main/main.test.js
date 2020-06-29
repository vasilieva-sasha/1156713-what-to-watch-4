import React from "react";
import renderer from "react-test-renderer";
import {Main} from "./main";
import {Movie} from "../../common/mock-test";

const films = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  preview: ``
}];

describe(`MainComponent`, () => {
  it(`Main correct render`, () => {
    const tree = renderer
    .create(
        <Main
          title={Movie.TITLE}
          genre={Movie.GENRE}
          date={Movie.DATE}
          films={films}
          onCardClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
