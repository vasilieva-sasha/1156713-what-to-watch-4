import * as React from "react";
import {Film} from "../../types";

interface Props {
  isPlaying: boolean;
  film: Film;
}


class VideoPlayer extends React.PureComponent<Props, {}> {
  private videoRef: React.RefObject<HTMLVideoElement>

  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const {film} = this.props;
    const video = this.videoRef.current;

    if (video) {
      video.src = film.preview;
      video.muted = true;
    }
  }

  componentWillUnmount() {
    const video = this.videoRef.current;

    if (video) {
      video.oncanplaythrough = null;
      video.onplay = null;
      video.src = ``;
    }
  }

  componentDidUpdate() {
    const video = this.videoRef.current;

    if (video) {
      if (this.props.isPlaying) {
        video.play();
      } else {
        video.load();
      }
    }
  }

  render() {
    const {film} = this.props;
    return (
      <video
        style={{width: `100%`, height: `100%`}}
        poster={film.poster}
        ref={this.videoRef}
      />
    );
  }
}

export default VideoPlayer;
