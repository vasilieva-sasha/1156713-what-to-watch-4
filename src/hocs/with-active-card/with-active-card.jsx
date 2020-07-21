import React, {PureComponent} from 'react';

const withActiveCard = (Component) => {
  class WithActiveCard extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: null,
      };

      this._handleCardClick = this._handleCardClick.bind(this);
    }

    _handleCardClick(film) {
      this.setState({activeCard: film});
    }

    render() {
      return (
        <Component
          {...this.props}
          selectedFilm={this.state.activeCard}
          onCardClick={this._handleCardClick}
        />
      );
    }
  }

  return WithActiveCard;
};

export default withActiveCard;
