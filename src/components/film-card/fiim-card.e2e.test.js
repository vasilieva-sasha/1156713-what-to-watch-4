import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card";

const currentFilm = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`
};

Enzyme.configure({
  adapter: new Adapter()
});

describe(`FilmCardComponent`, () => {
  it(`Title click`, () => {
    const onTitleClick = jest.fn();

    const filmCardComponent = mount(
        <FilmCard film={currentFilm} onArticleHover={() => {}} onTitleClick={onTitleClick} />
    );

    const smallCardTitle = filmCardComponent.find(`.small-movie-card__title`);

    smallCardTitle.simulate(`click`);
    expect(onTitleClick.mock.calls.length).toBe(1);
  });

  it(`Card hover`, () => {
    const onArticleHover = jest.fn();

    const filmCardComponent = mount(
        <FilmCard film={currentFilm} onArticleHover={onArticleHover} onTitleClick={() => {}} />
    );

    const card = filmCardComponent.find(`.small-movie-card`);

    card.simulate(`mouseenter`);
    expect(onArticleHover.mock.calls.length).toBe(1);
    expect(onArticleHover.mock.calls[0][0]).toMatchObject(currentFilm);
  });
});
