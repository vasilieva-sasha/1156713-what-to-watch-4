import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";
import {Movie} from "./common/mock";

ReactDOM.render(
    <App title={Movie.TITLE} genre={Movie.GENRE} date={Movie.DATE}/>,
    document.querySelector(`#root`)
);

