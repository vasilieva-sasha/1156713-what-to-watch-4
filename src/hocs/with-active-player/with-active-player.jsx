import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: this.props.isPlaying
      };
    }

    render() {
      const {film, onArticleHover, onCardClick, isPlaying, onCardLeave} = this.props;
      return (
        <Component
          film={film}
          onArticleHover={() => {
            this.setState({isPlaying: !this.state.isPlaying});
            onArticleHover(film);
          }}
          onCardClick={onCardClick}
          isPlaying={isPlaying}
          onCardLeave={() => {
            this.setState({isPlaying: false});
            onCardLeave();
          }}
        />
      );
    }
  }

  WithActivePlayer.propTypes = {
    film: PropTypes.shape({
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired
    }).isRequired,
    onArticleHover: PropTypes.func.isRequired,
    onCardClick: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    onCardLeave: PropTypes.func.isRequired
  };

  return WithActivePlayer;
};

export default withActivePlayer;
