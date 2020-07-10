import React from "react";
import PropTypes from "prop-types";
import reviews from "../../common/mock/reviews";
import {Review} from "../review/review.jsx";

const FilmInfoReviews = (props) => {
  const {film} = props;

  const reviewsList = reviews.filter((reviewData) => {
    return film.reviews.includes(reviewData.id);
  });

  const splitIndex = Math.ceil(reviewsList.length / 2);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {reviewsList.slice(0, splitIndex).map((review) => {
          return <Review review={review} key={`${review.author}-${review.id}`}/>;
        })}
      </div>
      <div className="movie-card__reviews-col">
        {reviewsList.slice(splitIndex, reviewsList.length).map((review) => {
          return (
            <div className="review" key={`${review.author}-${review.id}`}>
              <blockquote className="review__quote">
                <p className="review__text">{review.text}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.author}</cite>
                  <time className="review__date" dateTime="2016-12-24">{review.date}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

FilmInfoReviews.propTypes = {
  film: PropTypes.shape({
    reviews: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired
};

export default FilmInfoReviews;
