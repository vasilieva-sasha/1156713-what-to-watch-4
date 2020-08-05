import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveFullScreenPlayer from './with-active-full-screen-player';

const mock = {
  poster: `poster`,
  video: `video`
};

Enzyme.configure({
  adapter: new Adapter()
});

const Player = () => {
  return (
    <div>

    </div>
  );
};


const PlayerWrapped = withActiveFullScreenPlayer(Player);

describe(`FullVideoPlayer HOC`, () => {
  it(`Video stops on pause`, () => {
    const wrapper = mount(
        <PlayerWrapped film={mock}/>
    );

    wrapper.instance()._renderVideo();
    wrapper.instance()._renderPauseButton();
    wrapper.instance()._renderPlayButton();

    window.HTMLMediaElement.prototype.play = () => Promise.resolve();

    expect(wrapper.state().isPlaying).toEqual(true);
    wrapper.instance()._handlePlayPauseToggle();
    expect(wrapper.state().isPlaying).toEqual(false);
  });
});
