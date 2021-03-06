import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {Routing} from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from 'react-redux';
import store,{persistor} from './redux/store';
import { BrowserRouter as Router } from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <Routing />
    </PersistGate>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
