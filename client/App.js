import React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Navbar from "./_components/Navbar";
import ReactRoutes from "./ReactRoutes";
import { Provider } from "react-redux";
import store from "../client/_store"

const App = () => {
  return(
    <Provider store={store}>
      <ChakraProvider>
        <Container maxW='container.xl' p='0'>
          <div className="main">
            <Navbar/>
            <ReactRoutes />
          </div>
        </Container>
      </ChakraProvider>  
    </Provider>
  );
};

export default App;