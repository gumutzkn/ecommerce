import React, { Component } from "react";

import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import axios from "axios";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    const instance = axios.create({ withCredentials: true });

    instance
      .post("https://mern-ecommerce-temp.herokuapp.com/user/login", {
        username,
        password,
      })
      .then((res) => {
        instance
          .get("https://mern-ecommerce-temp.herokuapp.com/")
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        console.log(res);
      })
      .catch((err) => console.log(err));
    this.setState({ username: "", password: "" });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your username and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="username"
            handleChange={this.handleChange}
            value={this.state.username}
            label="User Name"
            required
          />

          <FormInput
            type="password"
            name="password"
            handleChange={this.handleChange}
            value={this.state.password}
            label="Password"
            required
          />
          <CustomButton type="submit">Sign In</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignIn;
