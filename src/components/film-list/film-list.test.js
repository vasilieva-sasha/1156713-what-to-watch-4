import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list";
import {Router} from "react-router-dom";
import history from './../../history';

const films = [{
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  preview: ``
}];

describe(`FilmListComponent`, () => {

  it(`FilmList correct render`, () => {

    const tree = renderer.create(
        <Router history={history}>
          <FilmList films={films}
            shownFilms={films} onCardClick={() => {}}
            onCatalogButtonClick={() => {}}
            onGenreUpdate={() => {}}
            genre={`All genres`}/>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
