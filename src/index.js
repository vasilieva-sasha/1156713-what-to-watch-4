import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";
import {Movie} from "./common/mock/mock";
import films from "./common/mock/films";

ReactDOM.render(
    <App title={Movie.TITLE} genre={Movie.GENRE} date={Movie.DATE} films={films}/>,
    document.querySelector(`#root`)
);

