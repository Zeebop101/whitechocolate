import React from "react";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import Events00 from "./Components/Backend/Events00/Events00";
// import Events from "./Components/Events/Events";
import AdminLoginView from "./Components/Views/AdminLoginView/AdminLoginView";
import CancelView from "./Components/Views/Cancel/Cancel";
import HomeView from "./Components/Views/HomeView/HomeView.js";
import Success from "./Components/Views/Success/Success.js";

//This function will check whether a use is already logged in
//so that they cannot login again and again
const CheckAuth = ({ children }) => {
  let isAuthenticated = false;
  if (localStorage.getItem("currentUser")) isAuthenticated = true;
  return isAuthenticated ? <Navigate to="/admin-dashboard" /> : children;
};

//This function will check whther a user is logged in so that
//they can view the protected routes
const RequireAuth = ({ children }) => {
  let isAuthenticated = false;
  if (localStorage.getItem("currentUser")) isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} exact />
      <Route path="/success" element={<Success />} exact />
      <Route path="/cancel" element={<CancelView />} exact />
      <Route
        path="/admin-dashboard"
        element={
          <RequireAuth>
            <Events00 />
          </RequireAuth>
        }
        exact
      />
      <Route
        path="/admin-login"
        element={
          <CheckAuth>
            <AdminLoginView />
          </CheckAuth>
        }
        exact
      />
    </Routes>
  );
};

export default MyRoutes;
