import React, {PureComponent} from "react";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class FullScreenVideoPlayer extends PureComponent {

  render() {
    const {onExitClick,
      isPlaying,
      renderVideo,
      renderPlayButton,
      renderPauseButton,
      getTogglerPosition,
      getCountDown,
      onFullScreenClick} = this.props;
    return (
      <div className="player">
        {renderVideo()}

        <button type="button" className="player__exit" onClick={onExitClick}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={getTogglerPosition()} max="100"></progress>
              <div className="player__toggler" style={{left: `${getTogglerPosition()}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{getCountDown()}</div>
          </div>

          <div className="player__controls-row">
            {isPlaying ? renderPauseButton() : renderPlayButton()}
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen" onClick={onFullScreenClick}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

FullScreenVideoPlayer.propTypes = {
  onExitClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  renderVideo: PropTypes.func.isRequired,
  renderPlayButton: PropTypes.func,
  renderPauseButton: PropTypes.func,
  getTogglerPosition: PropTypes.func.isRequired,
  getCountDown: PropTypes.func.isRequired,
  onFullScreenClick: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onExitClick() {
    dispatch(AppActionCreator.changePlayerStatus(false));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(FullScreenVideoPlayer);
