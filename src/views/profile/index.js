import React from "react";
import SignOut from "../../components/signout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { oldPass: "", newPass: "", sign: "", msg: "" };
    this.month = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "july",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec"
    ];
  }

  handleChange = e => this.setState({ [e.target.id]: e.target.value, msg: "" });

  handleSubmit = e => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("data"));
    if (this.state.oldPass === data[localStorage.getItem("pos")].password) {
      if (!this.state.newPass.match(/^(?=.*\d).{6,16}$/g)) {
        this.setState({
          msg: "password must contain atleast one letter"
        });
      } else if (
        this.state.newPass === data[localStorage.getItem("pos")].password
      ) {
        this.setState({
          msg: "new password cannot be same as previous password"
        });
      } else {
        alert("your password updated successfully");
        data[
          localStorage.getItem("pos")
        ].password = this.state.newPass.toString();
        localStorage.setItem("data", JSON.stringify(data));
        this.setState({
          oldPass: "",
          newPass: ""
        });
      }
    } else {
      this.setState({ msg: "old password does not match" });
    }
  };

  onSignout = e => this.setState({ sign: "out" });

  imageHandler = e => {
    let p = new Promise((resolve, reject) => {
      resolve(e.target.files["0"].name);
      reject("err");
    });
    p.then(url => {
      const data = JSON.parse(localStorage.getItem("data"));
      data[localStorage.getItem("pos")].img = url;
      localStorage.setItem("data", JSON.stringify(data));
      this.setState({ img: url });
    }).catch(e => console.log());
  };

  render() {
    if (this.state.sign === "out") {
      return <SignOut status={this.props.status} />;
    }
    const data = JSON.parse(localStorage.getItem("data"))[
      localStorage.getItem("pos")
    ];
    return (
      <div className="row" style={{ padding: 10 }}>
        <div
          className="d-none d-lg-block col-sm-2"
          style={{ border: "1px solid black" }}
        >
          add sidebar
        </div>
        <div className="col-sm-5">
          <p>Name : {data.fname + " " + data.lname}</p>
          <p>Email : {data.email}</p>
          <p>Phone : {data.phone}</p>
          <p>Gender :{data.gender}</p>
          <p>
            Birthday :{" "}
            {data.dob.split("-")[2] +
              " " +
              this.month[data.dob.split("-")[1] - 1]}
          </p>
        </div>
        <div className="col-sm-5">
          <div className="col-sm-6" style={{ display: "inline-block" }}>
            <img
              id="im"
              src={data.img}
              alt="logo192.png"
              width="150"
              height="150"
              style={{ border: "1px solid black", borderRadius: "50%" }}
            />
            <p style={{ textAlign: "center" }}>
              <label htmlFor="imageInput">
                <FontAwesomeIcon icon={faCamera} />
              </label>
            </p>
            <input
              type="file"
              accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
              onChange={this.imageHandler}
              id="imageInput"
              size="10"
              style={{ display: "none" }}
            />
          </div>
          <div className="col-sm">
            <p>
              wlecome, {data.username}{" "}
              <button onClick={this.onSignout} style={{ borderRadius: "50px" }}>
                SignOut
              </button>
            </p>
            <form onSubmit={this.handleSubmit}>
              <div style={{ margin: "5px" }}>
                <label>old password : </label>
                <input
                  style={{ marginLeft: 10 }}
                  type="password"
                  id="oldPass"
                  value={this.state.oldPass}
                  onChange={this.handleChange}
                  minLength={6}
                  maxLength={16}
                  required
                ></input>
              </div>
              <div style={{ margin: "5px" }}>
                <label>new password : </label>
                <input
                  style={{ marginLeft: 10 }}
                  type="password"
                  id="newPass"
                  value={this.state.newPass}
                  onChange={this.handleChange}
                  minLength={6}
                  maxLength={16}
                  required
                ></input>
              </div>
              <div style={{ margin: "5px" }}>
                <button
                  type="submit"
                  onSubmit={this.handleSubmit}
                  style={{ borderRadius: "50px" }}
                >
                  reset password
                </button>
                <span style={{ color: "red" }}>{this.state.msg}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
