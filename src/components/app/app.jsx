import React from "react";
import PropTypes from "prop-types";
import {Main} from "../main/main.jsx";

const titleHandler = (evt) => {
  evt.preventDefault();
};

const App = (props) => {
  const {title, genre, date, titles} = props;
  return (
    <Main title={title}
      genre={genre}
      date={date}
      titles={titles}
      onTitleClick={titleHandler}
    />
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export {App};
