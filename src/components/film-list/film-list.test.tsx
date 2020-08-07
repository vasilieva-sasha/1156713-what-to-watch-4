import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmList from "./film-list";
import {Router} from "react-router-dom";
import history from '../../history';
import {films} from "../../common/test-data";

describe(`FilmListComponent`, () => {

  it(`FilmList correct render`, () => {

    const tree = renderer.create(
        <Router history={history}>
          <FilmList
            shownFilms={films}
            genre={`All genres`}/>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
