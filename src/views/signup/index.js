import React from "react";
//import Login from './login';
import { Redirect } from "react-router-dom";
import SignUpForm from "../../components/signUpForm";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        username: "",
        password: "",
        img: "user.png",
        confirmPassword: ""
      },
      errors: {}
    };
    this.arr = [];
  }
  handleChange = e => {
    const { data, errors } = this.state;
    if (e.target.id === "fname") {
      if (e.target.value.match(/[^a-zA-Z]/g)) {
        errors["fname"] = "only alphabets allowed";
        this.setState({ errors });
      } else {
        delete this.state.errors.fname;
      }
      data[e.target.id] = e.target.value;
      this.setState({
        data
      });
    } else if (e.target.id === "lname") {
      if (e.target.value.match(/[^a-zA-Z]/g)) {
        errors["lname"] = "only alphabets allowed";
        this.setState({ errors });
      } else {
        delete this.state.errors.lname;
      }
      data[e.target.id] = e.target.value;
      this.setState({
        data
      });
    } else if (e.target.id === "email") {
      if (JSON.parse(localStorage.getItem("data"))) {
        if (
          JSON.parse(localStorage.getItem("data")).findIndex(
            ele => ele.email === e.target.value
          ) !== -1
        ) {
          errors["email"] = "email already registered";
          this.setState({ errors });
        } else {
          delete this.state.errors.email;
        }
      }
      data[e.target.id] = e.target.value.trim();
      this.setState({
        data
      });
    } else if (e.target.id === "phone") {
      if (isNaN([e.target.value])) {
        return;
      }
      if (JSON.parse(localStorage.getItem("data"))) {
        if (
          JSON.parse(localStorage.getItem("data")).findIndex(
            ele => ele.phone === e.target.value
          ) !== -1
        ) {
          errors["phone"] = "phone already registered";
          this.setState({ errors });
        } else {
          delete this.state.errors.phone;
        }
      }
      data[e.target.id] = e.target.value.trim();
      this.setState({
        data
      });
    } else if (e.target.id === "username") {
      if (JSON.parse(localStorage.getItem("data"))) {
        if (
          JSON.parse(localStorage.getItem("data")).findIndex(
            ele => ele.username === e.target.value
          ) !== -1
        ) {
          errors["username"] = "user already registered";
          this.setState({ errors });
        } else {
          delete this.state.errors.username;
        }
      }
      data[e.target.id] = e.target.value.trim();
      this.setState({
        data
      });
    } else if (e.target.id === "password") {
      if (e.target.value.match(/^(?=.*\d).{6,16}$/g)) {
        delete this.state.errors.password;
      } else {
        errors["password"] =
          "Password must be between 6 and 16 digits long and include at least one numeric digit.";
        this.setState({ errors });
      }
      data[e.target.id] = e.target.value;
      this.setState({
        data
      });
    } else if (e.target.id === "confirmPassword") {
      if (e.target.value === this.state.data.password) {
        delete this.state.errors.confirmPassword;
      } else {
        errors["confirmPassword"] = "Password does not match";
        this.setState({ errors });
      }
      data[e.target.id] = e.target.value;
      this.setState({
        data
      });
    } else {
      data[e.target.id] = e.target.value;
      this.setState({
        data
      });
    }
    console.log(Object.keys(this.state.errors).length);
  };
  handleSubmit = e => {
    e.preventDefault();
    if (Object.keys(this.state.errors).length === 0) {
      this.arr.push(this.state.data);
      localStorage.setItem("data", JSON.stringify(this.arr));
      alert("You have successfully registered");
      this.setState({
        registered: true
      });
    } else {
      alert("recheck your form");
    }
  };
  handleChecked = e => {
    const { data } = this.state;
    data.gender = e.target.value;
    this.setState({ data });
  };
  handleRegistered = e => this.setState({ registered: true });

  render() {
    if (this.state.registered === true) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { data: this.arr, from: this.props.location }
          }}
        />
      );
    }
    if (localStorage.getItem("isAuthenticated")) {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      return <Redirect to={from} />;
    }
    return (
      <SignUpForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleChecked={this.handleChecked}
        handleRegistered={this.handleRegistered}
        data={this.state.data}
        msg={this.state.errors}
      />
    );
  }
}
export default SignUp;
