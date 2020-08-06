import * as React from "react";
import Review from "../review/review";
import {getReviews} from "../../reducer/data/selectors";
import {connect} from "react-redux";
import {getServerError} from '../../reducer/data/selectors';
import {ReviewInterface} from "../../types";

interface Props {
  reviews: Array<ReviewInterface>;
  serverError: boolean;
}


const FilmInfoReviews: React.FunctionComponent<Props> = (props: Props) => {
  const {reviews, serverError} = props;

  const splitIndex = Math.ceil(reviews.length / 2);

  return (
    serverError ?
      <div style={{color: `#000000`, textAlign: `center`, margin: `100px auto`}}>Server error! Reviews did not load</div> :
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {reviews.slice(0, splitIndex).map((review) => {
            return <Review review={review} key={`${review.user.name}-${review.id}`}/>;
          })}
        </div>
        <div className="movie-card__reviews-col">
          {reviews.slice(splitIndex, reviews.length).map((review) => {
            return <Review review={review} key={`${review.user.name}-${review.id}`}/>;
          })}
        </div>
      </div>
  );
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  serverError: getServerError(state)
});

export default connect(mapStateToProps)(FilmInfoReviews);
