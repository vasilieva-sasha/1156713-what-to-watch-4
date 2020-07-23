import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Operations as DataOperations} from "./reducer/data/data";
import {ActionCreator} from "./reducer/user/user";
import reducer from "./reducer/reducer";
import {Provider} from "react-redux";
import App from "./components/app/app";
import {Movie} from "./common/mock/mock";
import withActiveCard from "./hocs/with-active-card/with-active-card";
import {createAPI} from './api';
import {AuthorizationStatus} from "./common/consts";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperations.loadFilms());

const AppWrapped = withActiveCard(App);

ReactDOM.render(
    <Provider store={store}>
      <AppWrapped title={Movie.TITLE} genre={Movie.GENRE} date={Movie.DATE}/>
    </Provider>,
    document.querySelector(`#root`)
);
