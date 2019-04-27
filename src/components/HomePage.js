import React, { Component } from "react";
class HomePage extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>WELCOME TO HOME PAGE</h1>
        <h3 style={{ textAlign: "center" }}>
          {this.props.isConnected &&
            `${
              this.props.user.firstName
            } is connected using his email address ${this.props.user.email}`}
          {!this.props.isConnected && "no user is connected"}
        </h3>
      </div>
    );
  }
}

export default HomePage;
