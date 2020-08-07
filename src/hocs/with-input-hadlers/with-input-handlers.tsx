import * as React from 'react';
import {RATING, Comment} from '../../common/consts';
import {Subtract} from 'utility-types';
import {Film} from './../../types';

interface State {
  rating: number;
  comment: string;
}

interface InjectingProps {
  film: Film;
  onReviewSubmit: (film: Film, reviewData: {
    rating: number;
    comment: string;
  }) => void;
}

const withInputHandlers = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithInputHandlers extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        rating: RATING,
        comment: ``
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleRatingSelect = this.handleRatingSelect.bind(this);
      this.handleCommentType = this.handleCommentType.bind(this);
    }

    private handleRatingSelect(evt) {
      this.setState({
        rating: evt.target.value
      });
    }

    private handleCommentType(evt) {
      this.setState({
        comment: evt.target.value
      });
    }

    private handleSubmit(evt) {
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
          onSubmit={this.handleSubmit}
          onRatingSelect={this.handleRatingSelect}
          onCommentType={this.handleCommentType}
          isButtonBlocked={this.state.comment.length > Comment.MIN && this.state.rating !== 0 ? false : true}
        />
      );
    }
  }

  return WithInputHandlers;
};

export default withInputHandlers;
