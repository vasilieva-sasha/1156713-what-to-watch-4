import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import GenreList from "./genre-list";
import {films} from "../../common/test-data";

const genres = [`All genres`, `Comedy`, `Horror`, `Family`];

configure({
  adapter: new Adapter()
});

describe(`GenreListComponent`, () => {
  it(`Genre list gets correct active genre`, () => {
    const onFilterClick = jest.fn();

    const genreList = mount(
        <GenreList films={films} genres={genres} activeGenre={`All genres`} onFilterClick={onFilterClick} />
    );

    const item = genreList.find(`a`).at(2);

    item.simulate(`click`);

    expect(onFilterClick).toBeCalledTimes(1);
    expect(onFilterClick).toBeCalledWith(films, genres[2]);
  });
});
