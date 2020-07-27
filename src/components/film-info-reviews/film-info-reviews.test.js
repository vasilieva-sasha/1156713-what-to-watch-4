import React from "react";
import renderer from "react-test-renderer";
import FilmInfoReviews from "./film-info-reviews";
import configureStore from 'redux-mock-store';
import NameSpace from './../../reducer/name-space';
import {Provider} from "react-redux";

const mock = [{
  id: 0,
  user: {
    id: 0,
    name: ``,
  },
  comment: ``,
  date: `PropTypes.string.isRequired`,
  rating: 0,
}];

const mockStore = configureStore([]);

describe(`ReviewsComponent`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      reviews: mock
    },
  });
  it(`film reviews component renders correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <FilmInfoReviews film={mock} />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
