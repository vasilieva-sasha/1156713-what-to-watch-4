import React from "react";
import renderer from "react-test-renderer";
import GenreList from "./genre-list";

const films = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  genre: `Drama`,
  releaseDate: 2018,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  preview: ``,
  rating: {
    score: `8,9`,
    level: `Very good`,
    count: 240
  },
  text: [`text`, `text`],
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`]
}];

const genres = [`All genres`, `Comedy`, `Horror`, `Family`];

describe(`GenreListComponent`, () => {
  it(`Genre list renders correctly`, () => {
    const tree = renderer.create(
        <GenreList films={films} genres={genres} activeGenre={`All genres`} onFilterClick={() => {}} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
