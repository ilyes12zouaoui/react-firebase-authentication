import React, { Component } from "react";
import { Link } from "react-router-dom";

class FireBaseProfile extends Component {
  render() {
    return (
      <center>
        <div
          style={{
            display: "inline-block",
            margin: "15px",
            padding: "15px",
            border: "2px solid black"
          }}
        >
          <h1>
            full name : {this.props.user.firstName} {this.props.user.lastName}
          </h1>
          <h1> email : {this.props.user.email}</h1>
        </div>
      </center>
    );
  }
}

export default FireBaseProfile;
