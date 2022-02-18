import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <>
          {/* A <Switch> looks through its children <Route>s and
           renders the first one that matches the current URL. */}
          <Header />

          <div className="app-body">
            <Sidebar />
            <Switch>
              <Route path="/" exact>
                <Chat />
              </Route>
            </Switch>
          </div>
        </>
      </Router>
    </div>
  );
}

export default App;
