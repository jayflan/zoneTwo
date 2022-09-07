import React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Navbar from "./_components/Navbar";
import ReactRoutes from "./ReactRoutes";

const App = () => {
  return(
    <ChakraProvider>
      <Container maxW='container.xl' p='0'>
        <div className="main">
          <Navbar/>
          <ReactRoutes />
          {/* <nav>
            <Navbar />
          </nav>
          <div>
            <LogIn />
            <Footer /> */}
            {/* <Landing /> */}
          {/* </div> */}
          {/* <div>
            <Footer />
          </div> */}
        </div>
      </Container>
    </ChakraProvider>  
  );
};

export default App;