import React from "react";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  changeStatus(v) {
    this.setState({
      loggedIn: v
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm">
            <Routes status={this.changeStatus.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
