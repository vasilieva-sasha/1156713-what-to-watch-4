import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list";

const films = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  preview: ``
}];

describe(`FilmListComponent`, () => {

  it(`FilmList correct render`, () => {

    const tree = renderer.create(
        <FilmList films={films}
          shownFilms={films} onCardClick={() => {}}
          onCatalogButtonClick={() => {}}
          onGenreUpdate={() => {}}
          genre={`All genres`}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
