import React from "react";
import renderer from "react-test-renderer";
import GenreList from "./genre-list";

const genres = [`All genres`, `Comedy`, `Horror`, `Family`];

describe(`GenreListComponent`, () => {
  it(`Genre list renders correctly`, () => {
    const tree = renderer.create(
        <GenreList genres={genres} activeGenre={`All genres`} onFilterClick={() => {}} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
