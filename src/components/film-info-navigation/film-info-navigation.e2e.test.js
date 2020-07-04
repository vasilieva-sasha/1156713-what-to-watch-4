import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmInfoNavigation from "./film-info-navigation";

Enzyme.configure({
  adapter: new Adapter()
});

describe(`FilmNavigationComponent`, () => {
  it(`Get index by click on tab`, () => {
    const onTabClick = jest.fn();

    const navigation = mount(
        <FilmInfoNavigation onTabClick={onTabClick} />
    );

    const tab = navigation.find(`a.movie-nav__link`).at(1);

    tab.simulate(`click`);
    expect(onTabClick).toHaveBeenCalledTimes(1);
    expect(onTabClick).toHaveBeenCalledWith(1);
  });
});
