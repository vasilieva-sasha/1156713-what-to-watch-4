import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import NameSpace from './../../reducer/name-space';
import AddReview from './add-review';
import {Router} from "react-router-dom";
import history from './../../history';

const film = {
  id: 1,
  title: ``,
  posterInfo: ``,
  background: ``,
  backgroundColor: ``
};

const mockStore = configureStore([]);

describe(`AddReviewComponent`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      isFormBlocked: false
    },
    [NameSpace.DATA]: {
      reviewError: false
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
        <Router history={history}>
          <Provider store={store}>
            <AddReview
              film={film}
              onSubmit={() => {}}
              onRatingSelect={() => {}}
              onCommentType={() => {}}
              isButtonBlocked={false}
              isFormBlocked={store.isFormBlocked}
              reviewError={store.reviewError}
              comment={``}/>
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
