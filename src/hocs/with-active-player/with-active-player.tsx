import * as React from "react";
import {Subtract} from "utility-types";
import {TIMEOUT} from '../../common/consts';
import {Film} from './../../types';

interface State {
  isPlaying: boolean;
}

interface InjectingProps {
  film: Film;
}

const withActivePlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;
  class WithActivePlayer extends React.PureComponent<T, State> {
    private timeOut: ReturnType<typeof setTimeout> = setTimeout(() => ``, TIMEOUT);
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };

      this.timeOut = null;
      this.handleArticleHover = this.handleArticleHover.bind(this);
      this.handleCardLeave = this.handleCardLeave.bind(this);
    }

    componentWillUnmount() {
      clearTimeout(this.timeOut);
    }

    private handleArticleHover() {
      this.timeOut = setTimeout(() => {
        this.setState({isPlaying: true});
      }, TIMEOUT);
    }

    private handleCardLeave() {
      clearTimeout(this.timeOut);
      this.setState({isPlaying: false});
    }

    render() {
      const {film} = this.props;
      return (
        <Component
          film={film}
          onArticleHover={this.handleArticleHover}
          isPlaying={this.state.isPlaying}
          onCardLeave={this.handleCardLeave}
        />
      );
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
