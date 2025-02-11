import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import NotAuthoriezed from "../pages/NotAuthoriezed";

function PrivateRoute({ children, requiredRole }) {
  const { isLoggedin } = useContext(AppContext);
  const userData = JSON.parse(localStorage.getItem("user_data")) || {};   // parsing data (for converting data JSON.string to JSON.object )
  // console.log(userData);
  
  // console.log("pri", userData.userType);
  
  // if user is not authenticate send to login page
  if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }

  return requiredRole?.includes(userData?.role) ? children : <NotAuthoriezed />
}

export default PrivateRoute;
