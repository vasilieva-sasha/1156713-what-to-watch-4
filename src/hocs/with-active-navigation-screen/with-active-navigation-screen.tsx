import * as React from 'react';
import {Subtract} from 'utility-types';
import {Film} from '../../types';

interface State {
  detailsScreen: number;
}

interface Props {
  film: Film;
  onLinkClick: () => void;
}

const withActiveNavigationScreen = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, Props>;

  class WithActiveNavigationScreen extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        detailsScreen: 0
      };

      this.handleChangeScreen = this.handleChangeScreen.bind(this);
    }

    private handleChangeScreen(index) {
      this.setState({detailsScreen: index});
    }

    render() {
      return (
        <Component
          {...this.props}
          film={this.props.film}
          detailsScreen={this.state.detailsScreen}
          onLinkClick={this.handleChangeScreen}
        />
      );
    }
  }

  return WithActiveNavigationScreen;
};

export default withActiveNavigationScreen;
