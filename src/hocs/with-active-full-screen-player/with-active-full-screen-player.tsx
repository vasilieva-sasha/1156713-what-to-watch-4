import * as React from 'react';
import {Subtract} from "utility-types";
import {Film} from './../../types';

interface State {
  progress: number;
  duration: number;
  isPlaying: boolean;
}

interface InjectingProps {
  film: Film;
}

const withActiveFullScreenPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveFullScreenPlayer extends React.PureComponent<T, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props) {
      super(props);

      this.state = {
        progress: 0,
        duration: 0,
        isPlaying: true
      };

      this.videoRef = React.createRef();

      this.renderVideo = this.renderVideo.bind(this);
      this.renderPlayButton = this.renderPlayButton.bind(this);
      this.renderPauseButton = this.renderPauseButton.bind(this);
      this.getTogglerPosition = this.getTogglerPosition.bind(this);
      this.getCountDown = this.getCountDown.bind(this);
      this.handlePlayPauseToggle = this.handlePlayPauseToggle.bind(this);
      this.handleFullScreenButton = this.handleFullScreenButton.bind(this);
    }

    componentDidMount() {
      const {film} = this.props;

      const video = this.videoRef.current;
      video.src = film.video;
      video.muted = false;
      const promise = video.play();

      if (promise !== undefined) {
        promise.then(() => {

          video.oncanplaythrough = () => this.setState({duration: video.duration});

          if (this.state.isPlaying) {
            video.play();
            video.ontimeupdate = () => this.setState({
              progress: Math.floor(video.currentTime),
            });
          } else {
            video.pause();
          }
        }).catch(() => {
          this.setState({isPlaying: false});
        });
      }
    }

    componentWillUnmount() {
      const video = this.videoRef.current;

      if (video) {
        video.oncanplaythrough = null;
        video.onplay = null;
        video.ontimeupdate = null;
        video.src = ``;
      }
    }

    componentDidUpdate() {
      const video = this.videoRef.current;

      if (document.fullscreenElement) {
        video.controls = true;
      } else {
        video.controls = false;
      }

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    private handlePlayPauseToggle() {
      const {isPlaying} = this.state;
      this.setState({isPlaying: !isPlaying});
    }

    private handleFullScreenButton() {
      return this.videoRef.current.requestFullscreen();
    }

    private renderVideo() {
      const {film} = this.props;
      return (
        <video className="player__video" poster={film.poster} ref={this.videoRef}></video>
      );
    }

    private renderPauseButton() {
      return (
        <button type="button" className="player__play" onClick={this.handlePlayPauseToggle}
        >
          <svg viewBox="0 0 14 21" width="14" height="21">
            <use xlinkHref="#pause"></use>
          </svg>
          <span>Pause</span>
        </button>
      );
    }

    private renderPlayButton() {
      return (
        <button type="button" className="player__play" onClick={this.handlePlayPauseToggle}>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
          <span>Play</span>
        </button>
      );
    }

    private getTogglerPosition() {
      const {progress, duration} = this.state;
      let position = 0;
      if (progress > 0) {
        position = progress / duration * 100;
      }
      return position;
    }

    private getCountDown() {
      const {progress, duration} = this.state;
      const time = duration - progress;
      const hours = Math.floor(time / 60);
      const seconds = Math.floor(time % 60) >= 10 ? Math.floor(time % 60) : `0${Math.floor(time % 60)}`;
      return `${hours} : ${seconds}`;
    }

    render() {
      return (
        <Component
          {...this.props}
          getTogglerPosition={this.getTogglerPosition}
          isPlaying={this.state.isPlaying}
          getCountDown={this.getCountDown}
          renderVideo={this.renderVideo}
          renderPlayButton={this.renderPlayButton}
          renderPauseButton={this.renderPauseButton}
          onFullScreenClick={this.handleFullScreenButton}
        />
      );
    }
  }

  return WithActiveFullScreenPlayer;
};

export default withActiveFullScreenPlayer;
