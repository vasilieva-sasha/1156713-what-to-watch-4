import React from "react";
import renderer from "react-test-renderer";
import withActivePlayer from './with-active-player';

const mock = {
  title: ``,
  poster: ``,
  preview: ``
};

const MockComponent = () => <div />;

const MockComponentWrapped = withActivePlayer(MockComponent);

describe(`WithActivePalyer`, () => {
  it(`WithActivePalyer renders correctly`, () => {
    const tree = renderer.create((
      <MockComponentWrapped film={mock} onCardClick={() => {}}/>
    ), {
      createNodeMock() {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
