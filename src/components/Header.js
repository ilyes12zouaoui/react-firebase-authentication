import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <center>
          <NavLink to="/" activeClassName="is-active" exact>
            home
          </NavLink>{" "}
          {this.props.isConnected && (
            <React.Fragment>
              <NavLink to="/profile" activeClassName="is-active">
                profile
              </NavLink>{" "}
              <Link to="/" onClick={this.props.disconnectCurrentUser}>
                logout
              </Link>
            </React.Fragment>
          )}
          {!this.props.isConnected && (
            <React.Fragment>
              <NavLink to="/signUp" activeClassName="is-active">
                signUp
              </NavLink>{" "}
              <NavLink to="/signIn" activeClassName="is-active">
                signIn
              </NavLink>
            </React.Fragment>
          )}
        </center>
      </div>
    );
  }
}

export default Header;
