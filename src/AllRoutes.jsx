import React, { useContext } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./middleware/PrivateRoute";
import { AppContext } from "./context/AppContext";
import AddEmployee from "./pages/AddEmployee";
import AllEmployee from "./pages/AllEmployee";
import HrLeaveSection from "./pages/HrLeaveSection";
import LeaveSection from "./pages/LeaveSection";

const AllRoutes = () => {
  const { isLoggedin } = useContext(AppContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute requiredRole={["hr", "employee"]}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={!isLoggedin && <Login />} />
      {/* <Route
        path="/register"
        element={
          <PrivateRoute requiredRole={["hr"]}>
            <Register />
          </PrivateRoute>
        }
      /> */}
      <Route
        path="/add-employee"
        element={
          <PrivateRoute requiredRole={["hr"]}>
            <Register />
          </PrivateRoute>
        }
      />
      <Route
        path="/all-employee"
        element={
          <PrivateRoute requiredRole={["hr"]}>
            <AllEmployee />
          </PrivateRoute>
        }
      />
      <Route
        path="/hr-leave-section"
        element={
          <PrivateRoute requiredRole={["hr"]}>
            <HrLeaveSection />
          </PrivateRoute>
        }
      />
      <Route
        path="/leave-section"
        element={
          <PrivateRoute requiredRole={["employee"]}>
            <LeaveSection />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
