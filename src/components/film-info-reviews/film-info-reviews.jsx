import React from "react";
import PropTypes from "prop-types";
import {Review} from "../review/review";
import {getReviews} from "../../reducer/data/selectors";
import {connect} from "react-redux";
import {CurrentPage} from "../../common/consts";
import {getCurrentPage} from "../../reducer/app/selectors";
import {getServerError} from './../../reducer/data/selectors';

const FilmInfoReviews = (props) => {
  const {reviews, currentPage, serverError} = props;

  const splitIndex = Math.ceil(reviews.length / 2);

  return (
    currentPage === CurrentPage.INFO && serverError ?
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
  ),
  currentPage: PropTypes.string.isRequired,
  serverError: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  currentPage: getCurrentPage(state),
  serverError: getServerError(state)
});

export default connect(mapStateToProps)(FilmInfoReviews);
