import * as React from "react";
import Header from '../header/header';
import {getFormStatus} from '../../reducer/app/selectors';
import {connect} from 'react-redux';
import {CurrentPage, RATING, AppRoute, Comment} from "../../common/consts";
import {getReviewError} from '../../reducer/data/selectors';
import {Link} from 'react-router-dom';
import {Film} from './../../types';

interface Props {
  film: Film;
  onSubmit: () => void;
  onRatingSelect: () => void;
  onCommentType: () => void;
  isButtonBlocked: boolean;
  isFormBlocked: boolean;
  reviewError: boolean;
  comment: string;
}

const AddReview: React.FunctionComponent<Props> = (props: Props) => {
  const {film, onSubmit, onRatingSelect, onCommentType, isButtonBlocked, isFormBlocked, reviewError, comment} = props;
  const stars = new Array(RATING);

  return (
    <section className="movie-card movie-card--full" style={{background: film.backgroundColor}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={film.background} alt={film.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header currentPage={CurrentPage.REVIEW}>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.FILM}/${film.id}`} className="breadcrumbs__link">{film.title}</Link>
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
              {
                Array.from(stars).map((_, index) => {
                  const rating = index + 1;
                  return (
                    <React.Fragment key={index + 1}>
                      <input className="rating__input" id={`star-${rating}`} type="radio" name="rating" value={`${rating}`}/>
                      <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
                    </React.Fragment>
                  );
                })
              }
            </div>
          </div>

          <div className="add-review__text" style={{background: `rgba(255, 255, 255, 0.1)`}}>
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" minLength={Comment.MIN} maxLength={Comment.MAX} onChange={onCommentType} value={comment}></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={isButtonBlocked}>Post</button>
            </div>
          </div>
        </form>
        {reviewError ? <div style={{color: `#000000`, textAlign: `center`}}>Oops! Server error! Please try again later</div> : ``}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isFormBlocked: getFormStatus(state),
  reviewError: getReviewError(state)
});

export default connect(mapStateToProps)(AddReview);
