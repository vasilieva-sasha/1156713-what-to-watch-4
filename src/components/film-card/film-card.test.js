import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card";

const film = {
  title: ``,
  poster: ``,
  preview: ``
};

describe(`FilmCardComponent`, () => {
  it(`FilmCard correct render`, () => {
    const tree = renderer.create(
        <FilmCard film={film} onArticleHover={() => {}} onCardClick={() => {}} isPlaying={false} onCardLeave={() => {}} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
