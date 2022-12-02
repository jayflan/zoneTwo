import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import Dashboard from "./_components/Dashboard";
import Landing from "./_components/Landing";
import LogIn from "./_components/LogIn";
import SignUp from "./_components/SignUp";
import UserWorkout from "./_components/UserWorkout";
import PageNotFound from "./_components/PageNotFound";


//<----- Bad Token Detection & Reset Fn----->
const revokeToken = () => {
  window.localStorage.removeItem('token');
}

const ReactRoutes = () => {

//<---------- hooks ---------->
const auth = useSelector((state) => state.auth);

//<---------- compDidMount ---------->

//<---------- custom component wrapper Fns ---------->
const ShowProtectedRoute = ({ children }) => {
  const token = window.localStorage.getItem('token');
  if(auth === 'error' || token === "" || !token) {
    revokeToken();
    return <Navigate to="/login" replace/>;
  } else if(token)  {
      return children;
  } else {
    return <Navigate to="/login" replace/>;
  };
}

const NoShowRoute = ({ children }) => {
  const token = window.localStorage.getItem('token');
  if(token)  {
    return <Navigate to="/dashboard" replace/>;
  } else {
    return children;
  };
}

//<---------- render ---------->
  return(
    <div>
      <Routes>
        <Route exact path="workouts/user/:id" element={<ShowProtectedRoute><UserWorkout/></ShowProtectedRoute>}/>
        <Route exact path="dashboard" element={<ShowProtectedRoute><Dashboard/></ShowProtectedRoute>}/>
        <Route exact path="/" element={<NoShowRoute><Landing/></NoShowRoute>}/>
        <Route exact path="landing" element={<NoShowRoute><Landing/></NoShowRoute>}/>
        <Route exact path="login" element={<NoShowRoute><LogIn/></NoShowRoute>}/>
        <Route exact path="signup" element={<NoShowRoute><SignUp/></NoShowRoute>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </div>
  );
};

export default ReactRoutes;