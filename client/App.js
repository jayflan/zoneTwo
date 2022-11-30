import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Navbar from "./_components/Navbar";
import ReactRoutes from "./ReactRoutes";
import { getUsers, me } from "./_store";
import { useDispatch } from "react-redux";

const App = () => {

  //"Global" Store dispatch done here
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(me());
    document.body.style.backgroundColor = "#071907" // change background body to black
  }, []);

  return(
    <ChakraProvider>
      <Navbar/>
      <Container maxW='container.xl' p='0'>
        <div className="main">
          <ReactRoutes/>
        </div>
      </Container>
    </ChakraProvider>  
  );
};

export default App;