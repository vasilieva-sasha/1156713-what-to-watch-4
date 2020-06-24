import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card";

const currentFilm = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  genre: `Drama`,
  releaseDate: 2018,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  rating: {
    score: `8,9`,
    level: `Very good`,
    count: 240
  },
  text: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge
                Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\`s friend and protege.`,
  `Gustave prides himself on providing first-class service to the hotel\`s guests, including satisfying
                the sexual needs of the many elderly women who stay there. When one of Gustave\`s lovers dies
                mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her
                murder.`],
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
        <FilmCard film={currentFilm} onArticleHover={() => {}} onCardClick={onCardClick} />
    );

    const smallCardTitle = filmCardComponent.find(`.small-movie-card__title`);

    smallCardTitle.simulate(`click`);
    expect(onCardClick.mock.calls.length).toBe(1);
    expect(onCardClick).toHaveBeenCalledWith(currentFilm);
  });

  it(`Image click`, () => {
    const onCardClick = jest.fn();

    const filmCardComponent = mount(
        <FilmCard film={currentFilm} onArticleHover={() => {}} onCardClick={onCardClick} />
    );

    const smallCardImage = filmCardComponent.find(`.small-movie-card__image`);

    smallCardImage.simulate(`click`);
    expect(onCardClick.mock.calls.length).toBe(1);
    expect(onCardClick).toHaveBeenCalledWith(currentFilm);
  });

  it(`Card hover`, () => {
    const onArticleHover = jest.fn();

    const filmCardComponent = mount(
        <FilmCard film={currentFilm} onArticleHover={onArticleHover} onCardClick={() => {}} />
    );

    const card = filmCardComponent.find(`.small-movie-card`);

    card.simulate(`mouseenter`);
    expect(onArticleHover.mock.calls.length).toBe(1);
    expect(onArticleHover).toHaveBeenCalledWith(currentFilm);
  });
});
