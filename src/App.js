import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import Login from "./components/Login";
import Spinner from "react-spinkit";
import CryptoNews from "./components/CryptoNews";
import CryptoHome from "./components/CryptoHome";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import Settings from "./components/Settings";
import { ThemeProvider } from "./components/ThemeContext";
import { NotificationContextProvider } from "./components/NotificationsContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShakeLoader from "./components/ShakeLoader";

function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loading-contents">
          <img
            src="https://c.tenor.com/46lAWM-p0eYAAAAC/kermit-falling.gif"
            alt=""
          />
          <Spinner
            name="ball-spin-fade-loader"
            color="var(--accent-1)"
            fadeIn="none"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <NotificationContextProvider>
        <ThemeProvider>
          <Router>
            {!user ? (
              <Login />
            ) : (
              <>
                {/* A <Switch> looks through its children <Route>s and
           renders the first one that matches the current URL. */}
                {/* <Header /> */}

                <div className="app-body">
                  <Sidebar />
                  <Switch>
                    <Route path="/" exact>
                      <Chat />
                    </Route>
                    {/* <Route path="/DirectMessage" exact>
                  <DirectMessage /> */}
                    <Route path="/DirectMessage"></Route>
                    <Route path="/crypto-home" exact>
                      <CryptoHome />
                    </Route>
                    <Route path="/cryptocurrencies" exact>
                      <Cryptocurrencies />
                    </Route>
                    <Route path="/crypto/:coinId" exact>
                      <CryptoDetails />
                    </Route>
                    <Route path="/crypto-news" exact>
                      <CryptoNews />
                    </Route>
                    <Route path="/settings" exact>
                      <Settings />
                    </Route>
                  </Switch>
                </div>
              </>
            )}
          </Router>
        </ThemeProvider>
      </NotificationContextProvider>
    </div>
  );
}

export default App;
