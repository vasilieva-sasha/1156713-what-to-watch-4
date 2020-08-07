import * as React from "react";
import * as renderer from 'react-test-renderer';
import FullScreenVideoPlayer from "./full-screen-video-player";
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space';
import {Provider} from "react-redux";
import {noop, film} from "../../common/test-data";

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
          <FullScreenVideoPlayer
            isPlaying={true}
            renderVideo={() => null}
            renderPlayButton={() => null}
            renderPauseButton={() => null}
            getTogglerPosition={() => null}
            getCountDown={() => null}
            onFullScreenClick={noop}
            film={film}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Full Screen Video Player renders correctly while pause`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <FullScreenVideoPlayer
            isPlaying={false}
            renderVideo={() => null}
            renderPlayButton={() => null}
            renderPauseButton={() => null}
            getTogglerPosition={() => null}
            getCountDown={() => null}
            onFullScreenClick={noop}
            film={film}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
