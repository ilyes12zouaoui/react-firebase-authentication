import React, { Component } from "react";
import firebase from "firebase";
class FireBaseSignUp extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      errorMessage: ""
    };
  }

  generateId() {
    return btoa(Math.random()).substring(0, 12);
  }

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(connectedUser => {
        firebase
          .database()
          .ref("users/" + connectedUser.user.uid)
          .set({
            id: connectedUser.user.uid,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
          })
          .then(() => {
            this.props.history.push("/");
          });
      })
      .catch(err => {
        this.setState({ errorMessage: err.message });
      });
  }

  render() {
    return (
      <div>
        <center>
          <h1>Sign Up</h1>
          <form onSubmit={this.onFormSubmit}>
            <label>email</label>
            <input
              type="email"
              value={this.state.email}
              onChange={this.onInputChange}
              name="email"
            />
            <br />
            <label>first Name</label>
            <input
              type="text"
              value={this.state.firstName}
              name="firstName"
              onChange={this.onInputChange}
            />
            <br />
            <label>last NAME</label>
            <input
              type="text"
              value={this.state.lastName}
              onChange={this.onInputChange}
              name="lastName"
            />
            <br /> <label>password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.onInputChange}
              name="password"
            />
            <br />
            <input type="submit" value="inscription" />
          </form>
          {this.state.errorMessage && (
            <div style={{ color: "red" }}>{this.state.errorMessage}</div>
          )}
        </center>
      </div>
    );
  }
}

export default FireBaseSignUp;
