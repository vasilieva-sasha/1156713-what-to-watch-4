import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list";
import configureStore from "redux-mock-store";
import {getGenres} from './../../common/utils';
import {Provider} from 'react-redux';
import withFilmsAmount from './../../hocs/with-films-amount/with-films-amount';

const films = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  preview: ``
}];

const mockStore = configureStore([]);

describe(`FilmListComponent`, () => {
  const store = mockStore({
    genre: `All genres`,
    genres: getGenres(films),
    films,
    filteredFilms: films
  });

  it(`FilmList correct render`, () => {

    const FilmListWrapped = withFilmsAmount(FilmList);
    const tree = renderer.create(
        <Provider store={store}>
          <FilmListWrapped films={films} onCardClick={() => {}} genre={store.genre}/>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
