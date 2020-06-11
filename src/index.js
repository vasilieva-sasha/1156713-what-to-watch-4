import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";
import {Movie, TITLES} from "./common/mock";

ReactDOM.render(
    <App title={Movie.TITLE} genre={Movie.GENRE} date={Movie.DATE} titles={TITLES}/>,
    document.querySelector(`#root`)
);

