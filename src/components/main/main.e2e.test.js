import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main";
import {Movie, TITLES} from "../../common/mock-test";


Enzyme.configure({
  adapter: new Adapter()
});

describe(`MainComponent`, () => {
  it(`Title click`, () => {
    const onTitleClick = jest.fn();

    const mainComponent = shallow(
        <Main
          title={Movie.TITLE}
          genre={Movie.GENRE}
          date={Movie.DATE}
          titles={TITLES}
          onTitleClick={onTitleClick}
        />
    );

    const smallCardTitles = mainComponent.find(`.small-movie-card__title`);

    smallCardTitles.forEach((title) => title.simulate(`click`));
    expect(onTitleClick.mock.calls.length).toBe(TITLES.length);
  });
});
