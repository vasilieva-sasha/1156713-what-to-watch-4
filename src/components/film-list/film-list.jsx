import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import FilmCard from "../film-card/film-card.jsx";

class FilmList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCard: null
    };
  }

  render() {
    const {films, onCardClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {films.map((film, index) => {
          return (
            <FilmCard
              key={`${film.poster}-${index}`}
              film={film}
              onArticleHover={(currentFilm) => {
                currentFilm = films[index];
                this.setState({
                  selectedCard: currentFilm
                });
              }}
              onCardClick={onCardClick}
            />);
        })}
      </div>
    );
  }
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        poster: PropTypes.string
      }))
    .isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default FilmList;
