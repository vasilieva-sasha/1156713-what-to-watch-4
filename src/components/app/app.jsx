import React from "react";
import PropTypes from "prop-types";
import {Main} from "../main/main.jsx";

const titleHandler = (evt) => {
  evt.preventDefault();
};

const App = (props) => {
  const {title, genre, date, films} = props;
  return (
    <Main title={title}
      genre={genre}
      date={date}
      films={films}
      onTitleClick={titleHandler}
    />
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        poster: PropTypes.string
      }))
    .isRequired
};

export {App};
