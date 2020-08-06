import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddReview from './add-review';
import configureStore from 'redux-mock-store';
import NameSpace from "../../reducer/name-space";
import {Provider} from "react-redux";
import history from './../../history';
import {Router} from 'react-router-dom';

const film = {
  id: 1,
  title: ``,
  posterInfo: ``,
  background: ``,
  backgroundColor: ``
};

Enzyme.configure({
  adapter: new Adapter()
});

const mockStore = configureStore([]);
const store = mockStore({
  [NameSpace.APP]: {
    isFormBlocked: false,
  },
  [NameSpace.DATA]: {
    serverError: false,
    reviewError: false
  },
  [NameSpace.USER]: {
    authorizationStatus: `AUTH`,
    authInfo: {
      avatar: ``
    }
  }
});

describe(`AddReviewComponent`, () => {
  it(`Review Submit works correctly`, () => {
    const onSubmit = jest.fn();

    const addReview = mount(
        <Router history={history}>
          <Provider store={store}>
            <AddReview film={film}
              onSubmit={onSubmit}
              onRatingSelect={() => {}}
              onCommentType={() => {}}
              isButtonBlocked={false}
              isFormBlocked={false}
              reviewError={false}
              comment={``}
            />
          </Provider>
        </Router>
    );

    const form = addReview.find(`form`);

    form.simulate(`submit`);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
