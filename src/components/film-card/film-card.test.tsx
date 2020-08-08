import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmCard from "./film-card";
import {Router} from "react-router-dom";
import history from '../../history';
import {noop, film} from "../../common/test-data";

describe(`FilmCardComponent`, () => {
  it(`FilmCard correct render`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <FilmCard film={film} onArticleHover={noop} isPlaying={false} onCardLeave={noop} />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
