import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {TIMEOUT} from './../../common/consts';

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };

      this._timeOut = null;
      this._handleArticleHover = this._handleArticleHover.bind(this);
      this._handleCardLeave = this._handleCardLeave.bind(this);
    }

    componentWillUnmount() {
      clearTimeout(this._timeOut);
    }

    _handleArticleHover() {
      this._timeOut = setTimeout(() => {
        this.setState({isPlaying: true});
      }, TIMEOUT);
    }

    _handleCardLeave() {
      clearTimeout(this._timeOut);
      this.setState({isPlaying: false});
    }

    render() {
      const {film} = this.props;
      return (
        <Component
          film={film}
          onArticleHover={this._handleArticleHover}
          isPlaying={this.state.isPlaying}
          onCardLeave={this._handleCardLeave}
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
  };

  return WithActivePlayer;
};

export default withActivePlayer;
