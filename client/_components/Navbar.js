import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import SecondaryButton from "./styles/SecondaryButton";

const Navbar = () => {

  // let history = useNavigate();
  const location = useLocation();
  const isLoggedIn = 0;

  return(
    <div className="navbar">
      <Box mb='1' borderBottom='1px' borderBottomColor='gray.400'>
        <Flex direction='row' justify='space-between' bg='gray.50' h='full'>
          <Box as='div' pl='5' m='5' pt='1' fontSize='xl'><Text as='b'>zoneTwo</Text></Box>
          
          {/*LogIn / LogOut / SignUp button path toggle*/}
           {location.pathname === '/login' ?
            <Link to="/signup">
              <SecondaryButton m='5' mr='10'>SignUp</SecondaryButton>
            </Link> : '' }
            {location.pathname === '/signup' || location.pathname === '/landing' || location.pathname === '/' ?
            <Link to="/login">
              <SecondaryButton m='5' mr='10'>Login</SecondaryButton>
            </Link> : '' }
            {isLoggedIn ?
            <Link to="/landing">
              <SecondaryButton m='5' mr='10'>LogOut</SecondaryButton>
            </Link> : '' }

        </Flex>
      </Box>
    </div>
  );
}

export default Navbar;