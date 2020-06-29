import React from "react";
import renderer from "react-test-renderer";
import FilmInfo from "./film-info";


const film = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  genre: `Drama`,
  releaseDate: 2018,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  preview: ``,
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

describe(`FilmInfoComponent`, () => {
  it(`FilmInfo correct render`, () => {
    const tree = renderer.create(
        <FilmInfo film={film} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
