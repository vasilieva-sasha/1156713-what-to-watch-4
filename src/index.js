import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {Movie} from "./common/mock/mock";
import {createStore} from "redux";
import {reducer} from "./reducer/reducer";
import {Provider} from "react-redux";
import withActiveCard from "./hocs/with-active-card/with-active-card";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const AppWrapped = withActiveCard(App);

ReactDOM.render(
    <Provider store={store}>
      <AppWrapped title={Movie.TITLE} genre={Movie.GENRE} date={Movie.DATE}/>
    </Provider>,
    document.querySelector(`#root`)
);
