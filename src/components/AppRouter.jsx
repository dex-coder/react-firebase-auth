import React from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../contexts/AuthContext";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import NotfoundPage from "../pages/NotfoundPage";
import Profilepage from "../pages/Profilepage";
import ProtectedPage from "../pages/ProtectedPage";
import Registerpage from "../pages/Registerpage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <ProtectedRoute exact path="/login" component={Loginpage} />
          <ProtectedRoute exact path="/register" component={Registerpage} />
          <ProtectedRoute exact path="/profile" component={Profilepage} />
          <ProtectedRoute
            exact
            path="/protected-page"
            component={ProtectedPage}
          />
          <ProtectedRoute exact path="/forgot-password" component={ForgotPasswordPage} />
          <ProtectedRoute exact path="/reset-password" component={ResetPasswordPage} />
          <Route exact path="*" component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  );
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth();
  //destructure the path from props
  const { path } = props;
  const location = useLocation();

  if (
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password" ||
    path === "/reset-password"
    ) {
    //if the user is login and trying to reach out the above routes again then he can't acces them
    return currentUser ? (
      <Redirect to={location.state?.from ?? "/profile"} />
    ) : (
      <Route {...props} />
    );
  }

  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",

        //path is coming from route from where he request to see the protected route
        //if he's login he can see the protected route else he redirect to login
        state: { from: path },
      }}
    />
  );
}
