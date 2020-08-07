import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmInfoReviews from "./film-info-reviews";
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space';
import {Provider} from "react-redux";

const mock = [{
  id: 0,
  user: {
    id: 0,
    name: ``,
  },
  comment: ``,
  date: `2020-07-09T16:06:01.831Z`,
  rating: 0,
}];

const mockStore = configureStore([]);

describe(`ReviewsComponent`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      reviews: mock,
      serverError: false
    },
  });
  it(`film reviews component renders correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <FilmInfoReviews reviews={mock} serverError={store.serverError}/>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`film reviews component renders correctly with server error`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <FilmInfoReviews reviews={mock} serverError={true}/>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
