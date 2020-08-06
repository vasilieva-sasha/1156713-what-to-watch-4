import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveFullScreenPlayer from './with-active-full-screen-player';
import PropTypes from 'prop-types';

const mock = {
  poster: `poster`,
  video: `video`
};

Enzyme.configure({
  adapter: new Adapter()
});

const Player = (props) => {
  const {renderVideo, renderPlayButton, renderPauseButton} = props;
  return (
    <div>
      {renderVideo()}
      {renderPlayButton()}
      {renderPauseButton()}
    </div>
  );
};

Player.propTypes = {
  renderVideo: PropTypes.func,
  renderPlayButton: PropTypes.func,
  renderPauseButton: PropTypes.func,
};

const PlayerWrapped = withActiveFullScreenPlayer(Player);

describe(`FullVideoPlayer HOC`, () => {
  it(`Video stops on pause`, () => {
    const wrapper = mount(
        <PlayerWrapped film={mock}/>
    );

    window.HTMLMediaElement.prototype.play = () => Promise.resolve(jest.spyOn(_videoRef.current, `play`));
    window.HTMLMediaElement.prototype.pause = () => Promise.resolve();

    const {_videoRef} = wrapper.instance();

    wrapper.instance().componentDidMount();

    jest.spyOn(_videoRef.current, `play`);

    expect(wrapper.state().isPlaying).toEqual(true);
    wrapper.instance()._handlePlayPauseToggle();
    expect(wrapper.state().isPlaying).toEqual(false);
  });
});
