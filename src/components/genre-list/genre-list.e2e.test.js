import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreList, {getGenres} from "./genre-list.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

describe(`GenreListComponent`, () => {
  it(`Genre list gets correct active genre`, () => {
    const onFilterClick = jest.fn();

    const genreList = mount(
        <GenreList activeGenre={`All genres`} onFilterClick={onFilterClick} />
    );

    const item = genreList.find(`a`).at(2);

    item.simulate(`click`);

    expect(onFilterClick).toBeCalledTimes(1);
    expect(onFilterClick).toBeCalledWith(getGenres()[2]);
  });
});
