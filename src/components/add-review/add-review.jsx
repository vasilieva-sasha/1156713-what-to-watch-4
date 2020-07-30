import React from "react";
import PropTypes from 'prop-types';
import Header from './../header/header';
import {getFormStatus, getCurrentPage} from './../../reducer/app/selectors';
import {connect} from 'react-redux';
import {CurrentPage} from "../../common/consts";
import {getServerError} from './../../reducer/data/selectors';

const AddReview = (props) => {
  const {film, onSubmit, onRatingSelect, onCommentType, isButtonBlocked, isFormBlocked, currentPage, serverError} = props;

  return (
    <section className="movie-card movie-card--full" style={{background: film.backgroundColor}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={film.background} alt={film.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="movie-page.html" className="breadcrumbs__link">{film.title}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={film.posterInfo} alt={`${film.title} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={onSubmit} disabled={isFormBlocked}>
          <div className="rating">
            <div className="rating__stars" onChange={onRatingSelect}>
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2"/>
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3"/>
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4"/>
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5"/>
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text" style={{background: `rgba(255, 255, 255, 0.1)`}}>
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" minLength="50" maxLength="400" onChange={onCommentType}></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={isButtonBlocked}>Post</button>
            </div>
          </div>
        </form>
        {currentPage === CurrentPage.REVIEW && serverError ? <div style={{color: `#000000`, textAlign: `center`}}>Oops! Server error! Please try again later</div> : ``}
      </div>
    </section>
  );
};

AddReview.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isrequired,
    posterInfo: PropTypes.string.isrequired,
    background: PropTypes.string.isrequired,
    backgroundColor: PropTypes.string.isRequired
  }),
  onSubmit: PropTypes.func.isRequired,
  onRatingSelect: PropTypes.func.isRequired,
  onCommentType: PropTypes.func.isRequired,
  isButtonBlocked: PropTypes.bool.isRequired,
  isFormBlocked: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
  serverError: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isFormBlocked: getFormStatus(state),
  currentPage: getCurrentPage(state),
  serverError: getServerError(state)
});

export default connect(mapStateToProps)(AddReview);
