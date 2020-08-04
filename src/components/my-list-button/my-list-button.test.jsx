import React from "react";
import renderer from "react-test-renderer";
import configureStore from 'redux-mock-store';
import {Provider} from "react-redux";
import MyListButton from "./my-list-button";
import NameSpace from './../../reducer/name-space';

const mock = [{
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  genre: `Drama`,
  releaseDate: 2018,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  backgroundColor: ``,
  preview: ``,
  rating: {
    score: 8.9,
    level: `Very good`,
    count: 240
  },
  text: `text`,
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  isFavorite: true
},
{
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  genre: `Drama`,
  releaseDate: 2018,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  posterInfo: `posters/placeimg_218_327_animals`,
  background: `background/placeimg_1000_424_animals`,
  backgroundColor: ``,
  preview: ``,
  rating: {
    score: 8.9,
    level: `Very good`,
    count: 240
  },
  text: `text`,
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  isFavorite: false
}];

const mockStore = configureStore([]);
const store = mockStore({
  [NameSpace.DATA]: {
    films: mock
  },
  [NameSpace.USER]: {
    authorizationStatus: `AUTH`
  }
});

describe(`MyListButtonComponent`, () => {
  it(`MyListButtonComponent in list`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <MyListButton film={mock[0]} handleChangeFavoriteStatus={() => {}} authorizationStatus={store.authorizationStatus}/>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`MyListButtonComponent not in list`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <MyListButton film={mock[1]} handleChangeFavoriteStatus={() => {}} authorizationStatus={store.authorizationStatus}/>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
