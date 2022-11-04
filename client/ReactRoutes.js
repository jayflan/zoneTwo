import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./_components/Dashboard";
import Landing from "./_components/Landing";
import LogIn from "./_components/LogIn";
import SignUp from "./_components/SignUp";

const ReactRoutes = () => {
  return(
    <div>
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path='landing' element={<Landing/>}/>
        <Route exact path="login" element={<LogIn/>}/>
        <Route exact path="signup" element={<SignUp/>}/>
        <Route exact path="dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
};

export default ReactRoutes;