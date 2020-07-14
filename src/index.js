import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {Movie} from "./common/mock/mock";
import {createStore} from "redux";
import {reducer} from "./reducer/reducer.js";
import {Provider} from "react-redux";

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App title={Movie.TITLE} genre={Movie.GENRE} date={Movie.DATE}/>
    </Provider>,
    document.querySelector(`#root`)
);
