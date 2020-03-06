import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  Redirect,
  useLocation,
  NavLink
} from "react-router-dom";
import Login from "./views/login";
import SignUp from "./views/signup";
import Profile from "./views/profile";
import PasswordForget from "./views/forgetPassword";

export default function Routes(props) {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-inverse">
          <ul>
            {!localStorage.getItem("isAuthenticated") && (
              <React.Fragment>
                <li style={liStyle}>
                  <NavLink
                    to="/signup"
                    activeStyle={{
                      color: "crimson"
                    }}
                    style={linkStyle}
                  >
                    SignUp
                  </NavLink>
                </li>
                <li style={liStyle}>
                  <NavLink
                    to="/login"
                    activeStyle={{
                      color: "crimson"
                    }}
                    style={linkStyle}
                  >
                    Login
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {localStorage.getItem("isAuthenticated") && (
              <li style={liStyle}>
                <span style={{ color: "black" }}>welcome</span>
              </li>
            )}
          </ul>
        </nav>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={Login}
            status={props.status}
          />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Profile}
            status={props.status}
          />
          <Route path="/signup" component={SignUp} />
          <Route path="/forget-password" component={PasswordForget} />
          {/* <PrivateRoute path="/signout" component={SignOut} status={props.status} /> */}
          <Route
            path="/login"
            render={prop => <Login {...prop} status={props.status} />}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}
function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3 style={{ color: "red" }}>
        No matching url for<code>{location.pathname}</code>
      </h3>
    </div>
  );
}
const liStyle = {
  display: "inline-block",
  margin: "10px",
  padding: "10px 20px",
  borderRadius: "4px",
  boxShadow: "0px 0px 3px 2px #ccc"
};
const linkStyle = {
  textDecoration: "none",
  color: "black"
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("isAuthenticated") ? (
        <Component {...props} status={rest.status} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
