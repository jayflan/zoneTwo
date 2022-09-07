import React from "react";
import {Route, Routes} from "react-router-dom";
import Landing from "./_components/Landing";
import LogIn from "./_components/LogIn";

const ReactRoutes = () => {
  return(
    <div>
      <Routes>
        <Route exact path='landing' element={<Landing/>}/>
        <Route exact path="login" element={<LogIn/>}/>
      </Routes>
    </div>
  );
};

export default ReactRoutes;