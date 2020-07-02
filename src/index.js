import React from "react"
import ReactDOM from "react-dom"
import { createBrowserHistory } from "history"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
var hist = createBrowserHistory()
ReactDOM.render(
  <BrowserRouter history={hist}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
)
serviceWorker.unregister()
