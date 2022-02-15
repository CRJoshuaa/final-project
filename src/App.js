import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>

      <Router>
        <>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
