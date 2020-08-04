import React from "react";
import renderer from 'react-test-renderer';
import FullScreenVideoPlayer from "./full-screen-video-player";
import configureStore from 'redux-mock-store';
import NameSpace from './../../reducer/name-space';
import {Provider} from "react-redux";

const mock = {
  id: 1,
  title: ``
};

describe(`FullScreenVideoPlayerComponent`, () => {
  const mockStore = configureStore([]);
  const store = mockStore({
    [NameSpace.APP]: {
      genre: `All genres`,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
    },
  });
  it(`Full Screen Video Player renders correctly while playing`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <FullScreenVideoPlayer onExitClick={() => {}}
            isPlaying={true}
            renderVideo={() => {}}
            renderPlayButton={() => {}}
            renderPauseButton={() => {}}
            getTogglerPosition={() => {}}
            getCountDown={() => {}}
            onFullScreenClick={() => {}}
            film={mock}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Full Screen Video Player renders correctly while pause`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <FullScreenVideoPlayer onExitClick={() => {}}
            isPlaying={false}
            renderVideo={() => {}}
            renderPlayButton={() => {}}
            renderPauseButton={() => {}}
            getTogglerPosition={() => {}}
            getCountDown={() => {}}
            onFullScreenClick={() => {}}
            film={mock}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
