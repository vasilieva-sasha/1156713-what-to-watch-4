import React from "react";
import PropTypes from "prop-types";
import {Review} from "../review/review";
import {getReviews} from "../../reducer/data/selectors";
import {connect} from "react-redux";

const FilmInfoReviews = (props) => {
  const {reviews} = props;

  const splitIndex = Math.ceil(reviews.length / 2);

  return (
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

FilmInfoReviews.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }),
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
      })
  )
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state)
});

export default connect(mapStateToProps)(FilmInfoReviews);
