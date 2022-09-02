import React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Navbar from "./_components/Navbar";
import Landing from "./_components/Landing";
import Footer from "./_components/Footer";

const App = () => {
  return(
    <ChakraProvider>
      <Container maxW='container.xl' p='0'>
        <div className="main">
          <nav>
            <Navbar />
          </nav>
          <div>
            <Landing />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </Container>
    </ChakraProvider>  
  );
};

export default App;