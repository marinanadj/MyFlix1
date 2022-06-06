import React from "react";
import ReactDOM from "react-dom";
import { devToolsEnhancer } from "redux-devtools-extension";
import Container from "react-bootstrap/Container";
import { createStore } from "redux";
import { Provider } from "react-redux";
import moviesApp from "./reducers/reducers";

import MainView from "./components/main-view/main-view";

//import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

const store = createStore(moviesApp, devToolsEnhancer());

//Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

//Finds the root of your app
const container = document.getElementById("app-container");

//tells react to render your app in the root Dom element
// ReactDom.render(<MyFlixApplication />, container);
