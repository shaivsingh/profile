import React from "react";
import { Redirect } from "react-router-dom";

function InputField(props) {
  return (
    <input
      type={props.type}
      value={props.value}
      id={props.id}
      onChange={props.handleEvent}
      onSubmit={props.handleSubmit}
      onClick={props.handleSubmit}
      style={props.style}
      required
      minLength={6}
      maxLength={32}
      // size={24}
      autoComplete="off"
      pattern={props.pattern}
    />
  );
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usern: "",
      passw: "",
      passwValidMsg: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: [e.target.value],
      passwValidMsg: "",
      forgetPassword: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(e.target.id);
    if (e.target.id === "forgetBtn") {
      this.setState({ forgetPassword: true });
      return;
    }
    if (JSON.parse(localStorage.getItem("data")) === null) {
      alert("empty database");
      return;
    }
    let pos = JSON.parse(localStorage.getItem("data")).findIndex(
      ele =>
        ele.username === this.state.usern.toString() &&
        ele.password === this.state.passw.toString()
    );
    //console.log(pos);
    if (pos >= 0) {
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("pos", pos);
      this.props.status(true);
      return;
    }
    this.setState({ passwValidMsg: "invalid username/password" });
    return;
  };

  handleUnRegistered = e => this.setState({ unRegistered: true });

  render() {
    if (this.state.unRegistered === true) {
      return (
        <Redirect
          to={{
            pathname: "/signup"
          }}
        />
      );
    }
    if (localStorage.getItem("isAuthenticated")) {
      // const { from } = this.props.location.state || { from: { pathname: '/' } };
      return <Redirect to="/dashboard" />;
    }
    if (this.state.forgetPassword) {
      return <Redirect to="/forget-password" />;
    }
    return (
      <div
        className="col-sm-3"
        style={{
          boxShadow: "2px 2px 10px 2px black",
          margin: "auto",
          padding: "20px",
          backgroundImage: "linear-gradient(70deg, white, silver, transparent)"
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend
              style={{ textAlign: "center", textShadow: "5px 2px 6px black" }}
            >
              Sign In
            </legend>
            <div className="row" style={{ margin: "auto" }}>
              <div className="col-sm-12">
                <label>username: </label>
                <br />
                <InputField
                  type={"text"}
                  value={this.state.usern}
                  id={"usern"}
                  handleEvent={this.handleChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-sm-12">
                <label>password: </label>
                <br />
                <InputField
                  type={"password"}
                  value={this.state.passw}
                  id={"passw"}
                  handleEvent={this.handleChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-sm-12" style={{textAlign:'center'}}>
                <br />
                <InputField
                  className="btn"
                  type={"submit"}
                  value={"Submit"}
                  id={"btnSubmit"}
                  style={{
                    borderRadius: "50px",
                    outline: "none"
                  }}
                />
                <InputField
                  className="btn"
                  type={"submit"}
                  value={"Forget Password"}
                  id={"forgetBtn"}
                  handleSubmit={this.handleSubmit}
                  style={{
                    borderRadius: "50px",
                    outline: "none",
                    marginLeft: 10
                  }}
                />
                <p style={{ color: "red" }}>{this.state.passwValidMsg}</p>
              </div>
            </div>
          </fieldset>
        </form>
        <div style={{textAlign: 'center'}}>
          <p>
            {" "}
            Not registered{" "}
            <button
              type="button"
              onClick={this.handleUnRegistered}
              style={{ borderRadius: "50px", outline: "none" }}
            >
              click here
            </button>
          </p>
        </div>
      </div>
    );
  }
}
export default Login;
