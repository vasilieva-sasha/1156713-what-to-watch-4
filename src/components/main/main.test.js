import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main";
import {Movie} from "../../common/mock-test";
import {getGenres} from "../../common/utils";

const films = [{
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
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`]
}];

const mockStore = configureStore([]);

describe(`MainComponent`, () => {
  it(`Main correct render`, () => {
    const store = mockStore({
      genre: `All genres`,
      genres: getGenres(films),
      films,
      filteredFilms: films
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            title={Movie.TITLE}
            genre={Movie.GENRE}
            date={Movie.DATE}
            genres={store.genres}
            films={store.filteredFilms}
            activeGenre={store.genre}
            onCardClick={() => {}}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
