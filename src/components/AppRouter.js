import React, { Component } from "react";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";

import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";
import Header from "./Header";

import FireBaseProfile from "./FireBaseProfile";
import FireBaseSignUp from "./FireBaseSignUp";
import FireBaseSignIn from "./FireBaseSignIn";

import firebase from "./FireBaseConfig";
import "./Loading.css";

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerifyingOldExistingConnectedUser: true,
      isConnected: false,
      user: {}
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("connected : ", user);

        firebase
          .database()
          .ref(`/users/${user.uid}`)
          .once("value")
          .then(user => {
            const connectedUser = user.val();
            console.log("connected uer ", connectedUser);
            this.setState({
              isConnected: true,
              user: connectedUser,
              isVerifyingOldExistingConnectedUser: false
            });
          });
      } else {
        console.log("disconnected ! ");

        this.setState({
          isConnected: false,
          user: {},
          isVerifyingOldExistingConnectedUser: false
        });
      }
    });

    this.disconnectCurrentUser = this.disconnectCurrentUser.bind(this);
    this.waitingTillUserIsChecked = this.waitingTillUserIsChecked.bind(this);
  }

  waitingTillUserIsChecked() {
    this.setState({ isVerifyingOldExistingConnectedUser: true });
  }

  disconnectCurrentUser() {
    firebase
      .auth()
      .signOut()
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        {this.state.isVerifyingOldExistingConnectedUser && (
          <center style={{ marginTop: "100px" }}>
            <div className="lds-dual-ring" />
          </center>
        )}
        {!this.state.isVerifyingOldExistingConnectedUser && (
          <React.Fragment>
            <Header
              user={this.state.user}
              isConnected={this.state.isConnected}
              disconnectCurrentUser={this.disconnectCurrentUser}
            />
            <div>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <HomePage
                      {...props}
                      user={this.state.user}
                      isConnected={this.state.isConnected}
                    />
                  )}
                />
                <Route path="/signUp" component={FireBaseSignUp} />
                <Route
                  path="/signIn"
                  render={props => (
                    <FireBaseSignIn
                      {...props}
                      waitingTillUserIsChecked={this.waitingTillUserIsChecked}
                    />
                  )}
                />
                <Route
                  path="/profile"
                  render={props => (
                    <FireBaseProfile {...props} user={this.state.user} />
                  )}
                />

                <Route component={PageNotFound} />
              </Switch>
            </div>

            {/* <HomePage />
        <BookPage />
        <AboutPage /> */}
          </React.Fragment>
        )}
      </BrowserRouter>
    );
  }
}

export default AppRouter;
