import React from "react";
import renderer from "react-test-renderer";
import GenreList from "./genre-list.jsx";

describe(`GenreListComponent`, () => {
  it(`Genre list renders correctly`, () => {
    const tree = renderer.create(
        <GenreList activeGenre={`All genres`} onFilterClick={() => {}} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
