import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Main} from "../main/main.jsx";
import FilmInfo from "../film-info/film-info";
import film from "../../common/mock/film";

const titleHandler = (evt) => {
  evt.preventDefault();
};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {title, genre, date, films} = this.props;
    return (
      <Main title={title}
        genre={genre}
        date={date}
        films={films}
        onTitleClick={titleHandler}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <FilmInfo film={film}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

// const App = (props) => {
//   const {title, genre, date, films} = props;
//   return (
//     <Main title={title}
//       genre={genre}
//       date={date}
//       films={films}
//       onTitleClick={titleHandler}
//     />
//   );
// };

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        poster: PropTypes.string
      }))
    .isRequired,
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      score: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    }),
    text: PropTypes.arrayOf(PropTypes.string).isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export {App};
