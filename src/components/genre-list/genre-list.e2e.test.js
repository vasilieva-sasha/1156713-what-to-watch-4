import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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

Enzyme.configure({
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
