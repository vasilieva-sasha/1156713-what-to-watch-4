import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import FilmInfoNavigation from "./film-info-navigation";
import {noop, film} from "../../common/test-data";

configure({
  adapter: new Adapter()
});

describe(`FilmNavigationComponent`, () => {
  it(`Get index by click on tab`, () => {
    const onLinkClick = jest.fn((index) => index);

    const navigation = mount(
        <FilmInfoNavigation film={film}
          detailsScreen={0}
          onLinkClick={onLinkClick}/>
    );

    const tab = navigation.find(`.movie-nav__link`).at(1);

    tab.simulate(`click`, {preventDefault: noop});
    expect(onLinkClick).toHaveBeenCalledTimes(1);
    expect(onLinkClick).toHaveBeenCalledWith(1);
  });
});
