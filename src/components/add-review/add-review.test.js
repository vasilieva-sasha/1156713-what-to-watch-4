import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import NameSpace from './../../reducer/name-space';
import AddReview from './add-review';

const film = {
  title: ``,
  posterInfo: ``,
  background: ``,
  backgroundColor: ``
};

const mockStore = configureStore([]);

describe(`AddReviewComponent`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: `REVIEW`,
      isFormBlocked: false
    },
    [NameSpace.DATA]: {
      serverError: false
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      authInfo: {
        avatar: ``
      }
    }
  });
  it(`Add review renders correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <AddReview
            film={film}
            onSubmit={() => {}}
            onRatingSelect={() => {}}
            onCommentType={() => {}}
            isButtonBlocked={false}
            isFormBlocked={store.isFormBlocked}
            currentPage={store.currentPage}
            serverError={store.serverError} />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
