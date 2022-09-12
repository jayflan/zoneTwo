import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

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
              <Button as='button' m='5' mr='10'>SignUp</Button>
            </Link> : '' }
            {location.pathname === '/signup' || location.pathname === '/landing' ?
            <Link to="/login">
              <Button as='button' m='5' mr='10'>Login</Button>
            </Link> : '' }
            {isLoggedIn ?
            <Link to="/landing">
              <Button as='button' m='5' mr='10'>LogOut</Button>
            </Link> : '' }

        </Flex>
      </Box>
    </div>
  );
}

export default Navbar;