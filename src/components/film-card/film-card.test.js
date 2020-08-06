import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card";
import {Router} from "react-router-dom";
import history from './../../history';

const film = {
  id: 1,
  title: ``,
  poster: ``,
  preview: ``
};

describe(`FilmCardComponent`, () => {
  it(`FilmCard correct render`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <FilmCard film={film} onArticleHover={() => {}} isPlaying={false} onCardLeave={() => {}} />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
