import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main";
import NameSpace from './../../reducer/name-space';
import {Router} from "react-router-dom";
import history from './../../history';

const films = [{
  id: 1,
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
  text: [`text`, `text`],
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  isFavorite: false
}];

const genres = [`All genres`, `Comedy`, `Horror`, `Family`];

const mockStore = configureStore([]);

describe(`MainComponent`, () => {
  it(`Main correct render`, () => {
    const store = mockStore({
      [NameSpace.APP]: {
        genre: `All genres`,
        activeCard: null,
      },
      [NameSpace.DATA]: {
        promoFilm: films[0],
        films,
        filteredFilms: films
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
      },
    });

    const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <Main
              genres={genres}
              films={store.filteredFilms}
              activeGenre={store.genre}
            />
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
