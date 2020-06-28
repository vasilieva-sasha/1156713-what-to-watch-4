import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
import {Movie} from "../../common/mock-test";

const films = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  genre: `Drama`,
  releaseDate: 2018,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  rating: {
    score: `8,9`,
    level: `Very good`,
    count: 240
  },
  text: [`text`, `text`],
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`]
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
