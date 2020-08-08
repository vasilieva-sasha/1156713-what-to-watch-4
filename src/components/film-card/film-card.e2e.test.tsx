import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card";
import {Router} from "react-router-dom";
import history from '../../history';
import {film} from "../../common/test-data";

configure({
  adapter: new Adapter()
});

describe(`FilmCardComponent`, () => {
  it(`Card hover`, () => {
    const onArticleHover = jest.fn();
    const onCardLeave = jest.fn();

    const filmCardComponent = mount(
        <Router history={history}>
          <FilmCard film={film} onArticleHover={onArticleHover} isPlaying={false} onCardLeave={onCardLeave} />
        </Router>
    );

    const card = filmCardComponent.find(`.small-movie-card`);

    card.simulate(`mouseenter`);

    expect(onArticleHover.mock.calls.length).toBe(1);

    card.simulate(`mouseleave`);

    expect(onCardLeave.mock.calls.length).toBe(1);
  });
});
