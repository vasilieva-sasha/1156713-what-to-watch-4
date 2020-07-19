import React from "react";
import renderer from "react-test-renderer";
import withFilmsAmount from './with-films-amount';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';

const films = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `fantastic-beasts-the-crimes-of-grindelwald`,
  preview: ``
}];

const MockComponent = () => <div />;

const MockComponentWrapped = withFilmsAmount(MockComponent);

const mockStore = configureStore([]);

describe(`WithFilmsAmount`, () => {
  it(`WithFilmsAmount renders correctly`, () => {
    const store = mockStore({
      genre: `All genres`,
    });
    const tree = renderer.create((
      <Provider store={store}>
        <MockComponentWrapped films={films} genre={store.genre} onCardClick={() => {}}/>
      </Provider>
    ), {
      createNodeMock() {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
