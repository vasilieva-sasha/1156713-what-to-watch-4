import * as React from "react";
import * as renderer from "react-test-renderer";
import GenreList from "./genre-list";
import {noop, films} from "../../common/test-data";

const genres = [`All genres`, `Comedy`, `Horror`, `Family`];

describe(`GenreListComponent`, () => {
  it(`Genre list renders correctly`, () => {
    const tree = renderer.create(
        <GenreList films={films} genres={genres} activeGenre={`All genres`} onFilterClick={noop} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
