import React from "react";
import LabeledInput from "../labeledInput";

export default function SignUpForm(props) {
  // var today = new Date("2017-12-31");
  // var dd = today.getDate();
  // var mm = today.getMonth() + 1; //January is 0!
  // var yyyy = today.getFullYear();
  // if (dd < 10) {
  //   dd = "0" + dd;
  // }
  // if (mm < 10) {
  //   mm = "0" + mm;
  // }
  // today = yyyy + "-" + mm + "-" + dd;
  const {
    handleChecked,
    handleChange,
    handleRegistered,
    handleSubmit,
    data,
    msg
  } = props;
  const {
    fname,
    lname,
    email,
    phone,
    gender,
    dob,
    username,
    password,
    confirmPassword
  } = data;
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-6" style={{ margin: "auto" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              padding: 10,
              marginBottom: 30,
              boxShadow: "rgb(95, 95, 95) 0px 0px 5px 5px",
              background:
                "url(formbg.png) bottom right/100px 100px no-repeat, linear-gradient(#ccc, seagreen) "
            }}
          >
            <legend>Sign Up</legend>
            <div className="row">
              <div className="col-sm-6">
                <LabeledInput
                  lvalue="First Name : "
                  type="text"
                  id="fname"
                  onChange={handleChange}
                  value={fname}
                  minLength={3}
                  maxLength={20}
                  style={{ width: "100%" }}
                  // size={30}
                  msg={msg.fname}
                />
              </div>
              <div className="col-sm-6">
                <LabeledInput
                  lvalue="Last Name : "
                  type="text"
                  id="lname"
                  onChange={handleChange}
                  value={lname}
                  minLength={3}
                  maxLength={20}
                  style={{ width: "100%" }}
                  size={30}
                  msg={msg.lname}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <LabeledInput
                  lvalue="Email : "
                  type="email"
                  id="email"
                  onChange={handleChange}
                  value={email}
                  maxLength={320}
                  style={{ width: "100%" }}
                  // size={30}
                  minLength={6}
                  pattern="\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
                  title={"Enter valid email like: example@yahoo.com"}
                  msg={msg.email}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <LabeledInput
                  lvalue="Phone : "
                  type="tel"
                  id="phone"
                  onChange={handleChange}
                  value={phone}
                  maxLength={16}
                  style={{ width: "100%" }}
                  //size={30}
                  minLength={8}
                  pattern="^[0-9]{8,16}$"
                  msg={msg.phone}
                />
                <p style={{ color: "green" }}>*only numbers length 8-16</p>
              </div>
            </div>
            <div className="row" style={{ marginTop: 10 }}>
              <div className="col-sm-6">
                <h6>Gender</h6>
                <div className="col-sm-6">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    onChange={handleChecked}
                    value="Male"
                    checked={gender === "Male"}
                    required
                  ></input>
                  <label htmlFor="male" style={{ marginLeft: 10 }}>
                    Male
                  </label>
                </div>
                <div className="col-sm-6">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    onChange={handleChecked}
                    value="Female"
                    checked={gender === "Female"}
                  ></input>
                  <label htmlFor="female" style={{ marginLeft: 10 }}>
                    Female
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <h6>DOB</h6>
                <div className="col-sm">
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    min={"1900-01-01"}
                    max={"2017-12-31"}
                    required
                    onChange={handleChange}
                    placeholder={"dd-mm-yyyy"}
                  />
                  <br />
                  <span style={{ color: "green" }}>
                    minimum dob 31-dec-2017
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <LabeledInput
                  lvalue="username : "
                  type="text"
                  id="username"
                  onChange={handleChange}
                  value={username}
                  maxLength={16}
                  style={{ width: "100%" }}
                  size={30}
                  minLength={6}
                  msg={msg.username}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <LabeledInput
                  lvalue="password : "
                  type="password"
                  id="password"
                  onChange={handleChange}
                  value={password}
                  minLength={6}
                  maxLength={16}
                  style={{ width: "100%" }}
                  size={30}
                  msg={msg.password}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <LabeledInput
                  lvalue="confirmPassword : "
                  type="password"
                  id="confirmPassword"
                  onChange={handleChange}
                  value={confirmPassword}
                  minLength={6}
                  maxLength={16}
                  style={{ width: "100%" }}
                  size={30}
                  msg={msg.confirmPassword}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12" style={{ textAlign: "center" }}>
                <br></br>
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  style={{ borderRadius: "50px", outline: "none" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-3">
          <p style={{ position: "fixed" }}>
            Already registered{" "}
            <button
              type="button"
              onClick={handleRegistered}
              style={{ borderRadius: "50px", outline: "none" }}
            >
              click here
            </button>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
