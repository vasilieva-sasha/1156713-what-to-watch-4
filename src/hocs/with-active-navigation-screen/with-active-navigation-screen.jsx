import React, {PureComponent} from 'react';

const withActiveNavigationScreen = (Component) => {
  class WithActiveNavigationScreen extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        detailsScreen: 0
      };

      this._handleChangeScreen = this._handleChangeScreen.bind(this);
    }

    _handleChangeScreen(index) {
      this.setState({detailsScreen: index});
    }

    render() {
      return (
        <Component
          {...this.props}
          detailsScreen={this.state.detailsScreen}
          onLinkClick={this._handleChangeScreen}
        />
      );
    }
  }

  return WithActiveNavigationScreen;
};

export default withActiveNavigationScreen;
