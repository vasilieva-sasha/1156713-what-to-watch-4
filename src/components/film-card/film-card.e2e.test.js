import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card";
import {Router} from "react-router-dom";
import history from './../../history';

const currentFilm = {
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  genre: `Drama`,
  releaseDate: 2018,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: {
    score: `8,9`,
    level: `Very good`,
    count: 240
  },
  text: [``, ``],
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`]
};

Enzyme.configure({
  adapter: new Adapter()
});

describe(`FilmCardComponent`, () => {
  it(`Title click`, () => {
    const onCardClick = jest.fn();

    const filmCardComponent = mount(
        <Router history={history}>
          <FilmCard film={currentFilm} onArticleHover={() => {}} onCardClick={onCardClick} isPlaying={false} onCardLeave={() => {}} />
        </Router>
    );

    const smallCardTitle = filmCardComponent.find(`.small-movie-card__title`);

    smallCardTitle.simulate(`click`);
    expect(onCardClick.mock.calls.length).toBe(1);
    expect(onCardClick).toHaveBeenCalledWith(currentFilm);
  });

  it(`Image click`, () => {
    const onCardClick = jest.fn();

    const filmCardComponent = mount(
        <Router history={history}>
          <FilmCard film={currentFilm} onArticleHover={() => {}} onCardClick={onCardClick} isPlaying={false} onCardLeave={() => {}} />
        </Router>
    );

    const smallCardImage = filmCardComponent.find(`.small-movie-card__image`).at(2);

    smallCardImage.simulate(`click`);
    expect(onCardClick.mock.calls.length).toBe(1);
    expect(onCardClick).toHaveBeenCalledWith(currentFilm);
  });

  it(`Card hover`, () => {
    const onArticleHover = jest.fn();
    const onCardLeave = jest.fn();

    const filmCardComponent = mount(
        <Router history={history}>
          <FilmCard film={currentFilm} onArticleHover={onArticleHover} onCardClick={() => {}} isPlaying={false} onCardLeave={onCardLeave} />
        </Router>
    );

    const card = filmCardComponent.find(`.small-movie-card`);

    card.simulate(`mouseenter`);

    expect(onArticleHover.mock.calls.length).toBe(1);

    card.simulate(`mouseleave`);

    expect(onCardLeave.mock.calls.length).toBe(1);
  });
});
