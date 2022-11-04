import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import Dashboard from "./_components/Dashboard";
import Landing from "./_components/Landing";
import LogIn from "./_components/LogIn";
import SignUp from "./_components/SignUp";


const ReactRoutes = () => {

//<---------- hooks ---------->
const isLoggedIn = useSelector((state) => state.auth) || [];


//<---------- compDidMount ---------->



  return(
    <div>
        {isLoggedIn.id 
          ? (
        <Routes>
          <Route exact path="dashboard" element={<Dashboard/>}/>
          <Route path="*" element={<Navigate to="dashboard" replace/>}/>
        </Routes>
           ) : (
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route exact path="landing" element={<Landing/>}/>
          <Route exact path="login" element={<LogIn/>}/>
          <Route exact path="signup" element={<SignUp/>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
        )}
    </div>
  );
};

export default ReactRoutes;