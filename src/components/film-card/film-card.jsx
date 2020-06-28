import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

class FilmCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: this.props.isPlaying
    };
  }

  render() {
    const {film, onArticleHover, onCardClick, isPlaying, onCardLeave} = this.props;
    return (
      <article
        onMouseEnter={() => {
          setTimeout(() => {
            this.setState({isPlaying: !this.state.isPlaying});
            onArticleHover(film);
          }, 1000);

        }}
        onMouseLeave={() => {
          this.setState({isPlaying: false});
          onCardLeave();
        }}
        className="small-movie-card catalog__movies-card">
        <div onClick={(evt) => {
          evt.preventDefault();
          onCardClick(film);
        }} className="small-movie-card__image">
          <VideoPlayer isPlaying={isPlaying} film={film} />
        </div>
        <h3 onClick={(evt) => {
          evt.preventDefault();
          onCardClick(film);
        }} className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{film.title}</a>
        </h3>
      </article>
    );
  }
}

FilmCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired
  }).isRequired,
  onArticleHover: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onCardLeave: PropTypes.func.isRequired
};

export default FilmCard;
