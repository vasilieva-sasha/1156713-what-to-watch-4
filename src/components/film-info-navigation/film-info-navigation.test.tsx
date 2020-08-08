import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmInfoNavigation from "./film-info-navigation";
import {noop, film} from "../../common/test-data";


describe(`FilmNavigationComponent`, () => {
  it(`Navigation bar renders correctly`, () => {
    const tree = renderer.create(
        <FilmInfoNavigation film={film}
          detailsScreen={0}
          onLinkClick={noop}/>
    );

    expect(tree).toMatchSnapshot();
  });
});
