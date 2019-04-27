import React, { Component } from "react";
import firebase from "firebase";
class FireBaseSignIn extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      email: "",
      password: "",

      errorMessage: ""
    };
  }

  onFormSubmit(event) {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.waitingTillUserIsChecked();
        this.props.history.push("/profile");
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });
  }

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <center>
          <h1>Sign In</h1>
          <form onSubmit={this.onFormSubmit}>
            <label>email</label>
            <input
              type="email"
              value={this.state.email}
              onChange={this.onInputChange}
              name="email"
            />
            <br />
            <label>password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.onInputChange}
              name="password"
            />
            <br />
            <input type="submit" value="login" />
          </form>

          {this.state.errorMessage && (
            <div style={{ color: "red" }}>{this.state.errorMessage}</div>
          )}
        </center>
      </div>
    );
  }
}

export default FireBaseSignIn;
