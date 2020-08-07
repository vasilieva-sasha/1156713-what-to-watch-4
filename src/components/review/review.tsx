import * as React from "react";
import * as moment from "moment";
import {ReviewInterface} from "../../types";

interface Props {
  review: ReviewInterface;
}

const Review: React.FunctionComponent<Props> = (props: Props) => {
  const {review} = props;
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={review.date}>{moment(review.date).format(`MMMM DD, YYYY`)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
};

export default Review;
