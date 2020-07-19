import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {Movie} from "./common/mock/mock";
import {createStore} from "redux";
import {reducer} from "./reducer/reducer";
import {Provider} from "react-redux";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App title={Movie.TITLE} genre={Movie.GENRE} date={Movie.DATE}/>
    </Provider>,
    document.querySelector(`#root`)
);
