import React, {PureComponent, createRef} from "react";
import PropTypes from 'prop-types';
import Header from './../header/header';

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.ratingRef = createRef();
    this.commentRef = createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    const {film, onSubmit} = this.props;

    evt.preventDefault();

    onSubmit(film, {
      rating: this.ratingRef.current.value,
      comment: this.commentRef.current.value,
    });
  }

  render() {
    const {film} = this.props;
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
          <form action="#" className="add-review__form" onSubmit={this._handleSubmit}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1" ref={this.ratingRef}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" ref={this.ratingRef}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" ref={this.ratingRef}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" ref={this.ratingRef}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" ref={this.ratingRef}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text" style={{background: `rgba(255, 255, 255, 0.1)`}}>
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" ref={this.commentRef}></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }
}

AddReview.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isrequired,
    posterInfo: PropTypes.string.isrequired,
    background: PropTypes.string.isrequired,
    backgroundColor: PropTypes.string.isRequired
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default AddReview;
