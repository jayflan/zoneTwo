import React from "react";
import { ChakraProvider } from "@chakra-ui/react"; "@chakra-ui/react";
import Navbar from "./_components/Navbar";
import Routes from "./_components/Routes";
import Footer from "./_components/Footer";

const App = () => {
  return(
    <ChakraProvider>
      <div className="main">
        <nav>
          <Navbar />
        </nav>
        <div>
          <Routes />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </ChakraProvider>  
  );
};

export default App;