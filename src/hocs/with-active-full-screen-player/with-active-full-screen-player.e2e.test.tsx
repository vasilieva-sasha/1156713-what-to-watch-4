import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withActiveFullScreenPlayer from './with-active-full-screen-player';
import {film} from '../../common/test-data';

interface Props {
  renderVideo: () => React.ReactNode;
  renderPauseButton: () => React.ReactNode;
}

configure({
  adapter: new Adapter()
});

const Player: React.FunctionComponent<Props> = (props: Props) => {
  const {renderVideo, renderPauseButton} = props;
  return (
    <div>
      {renderVideo()}
      {renderPauseButton()}
    </div>
  );
};

const PlayerWrapped = withActiveFullScreenPlayer(Player);

describe(`FullVideoPlayer HOC`, () => {
  it(`Video stops on pause`, () => {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = () => Promise.resolve();

    const wrapper = mount(
        <PlayerWrapped film={film}/>
    );

    const {videoRef} = wrapper.instance();

    jest.spyOn(videoRef.current, `play`);

    const button = wrapper.find(`button`);


    expect(wrapper.state().isPlaying).toEqual(true);
    button.simulate(`click`);
    expect(wrapper.state().isPlaying).toEqual(false);
  });
});
