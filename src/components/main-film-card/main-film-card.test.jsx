import React from "react";
import renderer from "react-test-renderer";
import MainFilmCard from './main-film-card';

const Mock = {
  TITLE: `title`,
  GENRE: `genre`,
  DATE: 0
};

it(`Main film card renders correctly`, () => {
  const tree = renderer.create(<MainFilmCard title={Mock.TITLE} genre={Mock.GENRE} date={Mock.DATE}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
