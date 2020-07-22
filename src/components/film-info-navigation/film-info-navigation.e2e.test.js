import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmInfoNavigation from "./film-info-navigation";

const mock = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  genre: `Drama`,
  releaseDate: 2018,
  runtime: 100,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: {
    score: `8,9`,
    level: `Very good`,
    count: 240
  },
  text: [`In the 1930s`],
  director: `Wes Andreson`,
  actors: [`Bill Murray`],
  reviews: [0, 1]
};

Enzyme.configure({
  adapter: new Adapter()
});

describe(`FilmNavigationComponent`, () => {
  it(`Get index by click on tab`, () => {
    const onLinkClick = jest.fn((index) => index);

    const navigation = mount(
        <FilmInfoNavigation film={mock}
          detailsScreen={0}
          onLinkClick={onLinkClick}/>
    );

    const tab = navigation.find(`.movie-nav__link`).at(1);

    tab.simulate(`click`, {preventDefault: () => {}});
    expect(onLinkClick).toHaveBeenCalledTimes(1);
    expect(onLinkClick).toHaveBeenCalledWith(1);
  });
});
