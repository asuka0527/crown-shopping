import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

// redux
//The <Provider /> makes the Redux store available to any nested components
import { Provider } from "react-redux";
// redux store
import store from "./redux/store";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

//The <Provider /> makes the Redux store available to any nested
// components that have been wrapped in the connect() function.
// Since any React component in a React Redux app can be connected,
// most applications will render a <Provider> at the top level,
// with the entire app’s component tree inside of it.
// Normally, you can’t use a connected component unless it is nested inside of a <Provider>.
