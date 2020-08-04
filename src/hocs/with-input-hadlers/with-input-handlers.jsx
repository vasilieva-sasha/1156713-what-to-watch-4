import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {RATING} from '../../common/consts';

const withInputHandlers = (Component) => {
  class WithInputHandlers extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: RATING,
        comment: ``
      };

      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleRatingSelect = this._handleRatingSelect.bind(this);
      this._handleCommentType = this._handleCommentType.bind(this);
    }

    _handleRatingSelect(evt) {
      this.setState({
        rating: evt.target.value
      });
    }

    _handleCommentType(evt) {
      this.setState({
        comment: evt.target.value
      });
    }

    _handleSubmit(evt) {
      const {film, onReviewSubmit} = this.props;

      evt.preventDefault();

      onReviewSubmit(film, {
        rating: this.state.rating,
        comment: this.state.comment,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          comment={this.state.comment}
          onSubmit={this._handleSubmit}
          onRatingSelect={this._handleRatingSelect}
          onCommentType={this._handleCommentType}
          isButtonBlocked={this.state.comment.length > 50 && this.state.rating !== 0 ? false : true}
        />
      );
    }
  }

  WithInputHandlers.propTypes = {
    film: PropTypes.shape({
      title: PropTypes.string.isrequired,
      posterInfo: PropTypes.string.isrequired,
      background: PropTypes.string.isrequired,
      backgroundColor: PropTypes.string.isRequired
    }),
    onReviewSubmit: PropTypes.func.isRequired,
  };

  return WithInputHandlers;
};

export default withInputHandlers;
