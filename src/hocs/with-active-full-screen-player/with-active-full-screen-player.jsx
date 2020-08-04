import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

const withActiveFullScreenPlayer = (Component) => {
  class WithActiveFullScreenPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        progress: 0,
        duration: 0,
        isPlaying: true
      };

      this._videoRef = createRef();

      this._renderVideo = this._renderVideo.bind(this);
      this._renderPlayButton = this._renderPlayButton.bind(this);
      this._renderPauseButton = this._renderPauseButton.bind(this);
      this._getTogglerPosition = this._getTogglerPosition.bind(this);
      this._getCountDown = this._getCountDown.bind(this);
      this._handlePlayPauseToggle = this._handlePlayPauseToggle.bind(this);
      this._handleFullScreenButton = this._handleFullScreenButton.bind(this);
    }

    componentDidMount() {
      const {film} = this.props;

      const video = this._videoRef.current;
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
      const video = this._videoRef.current;

      if (video) {
        video.oncanplaythrough = null;
        video.onplay = null;
        video.ontimeupdate = null;
        video.src = ``;
      }
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

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

    _handlePlayPauseToggle() {
      const {isPlaying} = this.state;
      this.setState({isPlaying: !isPlaying});
    }

    _handleFullScreenButton() {
      return this._videoRef.current.requestFullscreen();
    }

    _renderVideo() {
      const {film} = this.props;
      return (
        <video className="player__video" poster={film.poster} ref={this._videoRef}></video>
      );
    }

    _renderPauseButton() {
      return (
        <button type="button" className="player__play" onClick={this._handlePlayPauseToggle}
        >
          <svg viewBox="0 0 14 21" width="14" height="21">
            <use xlinkHref="#pause"></use>
          </svg>
          <span>Pause</span>
        </button>
      );
    }

    _renderPlayButton() {
      return (
        <button type="button" className="player__play" onClick={this._handlePlayPauseToggle}>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
          <span>Play</span>
        </button>
      );
    }

    _getTogglerPosition() {
      const {progress, duration} = this.state;
      let position = 0;
      if (progress > 0) {
        position = progress / duration * 100;
      }
      return position;
    }

    _getCountDown() {
      const {progress, duration} = this.state;
      let time = duration - progress;
      let hours = Math.floor(time / 60);
      let seconds = Math.floor(time % 60) >= 10 ? Math.floor(time % 60) : `0${Math.floor(time % 60)}`;
      return `${hours} : ${seconds}`;
    }

    render() {
      return (
        <Component
          {...this.props}
          getTogglerPosition={this._getTogglerPosition}
          propgress={this.state.progress}
          isPlaying={this.state.isPlaying}
          getCountDown={this._getCountDown}
          renderVideo={this._renderVideo}
          renderPlayButton={this._renderPlayButton}
          renderPauseButton={this._renderPauseButton}
          onFullScreenClick={this._handleFullScreenButton}
        />
      );
    }
  }

  WithActiveFullScreenPlayer.propTypes = {
    film: PropTypes.shape({
      video: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired
    }),
  };

  return WithActiveFullScreenPlayer;
};

export default withActiveFullScreenPlayer;
