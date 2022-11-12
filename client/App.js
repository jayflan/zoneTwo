import React, { useEffect } from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Navbar from "./_components/Navbar";
import ReactRoutes from "./ReactRoutes";
import { getUsers } from "./_store";
import { useDispatch } from "react-redux";

const App = () => {

  //"Global" Store dispatch done here
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    document.body.style.backgroundColor = "#071907" // change background body to black
  });

  return(
    <ChakraProvider>
      <Navbar/>
      <Container maxW='container.xl' p='0'>
        <div className="main">
          <ReactRoutes />
        </div>
      </Container>
    </ChakraProvider>  
  );
};

export default App;