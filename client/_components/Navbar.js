import React, { useEffect} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import SecondaryButton from "./styles/SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import { logout, me } from "../_store/auth";

const Navbar = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  let isLoggedIn = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(me()),
    isLoggedIn = window.localStorage.getItem('token');
  }, []);

  return(
    <div className="navbar">
      <Box mb='1' borderBottom='1px' borderBottomColor='gray.400'> 
      {/* {console.log(Boolean(isLoggedIn))} */}
      {!isLoggedIn.email
        ? 
        <Flex direction='row' justify='space-between' bg='gray.50' h='full'>
          <Box as='div' pl='5' m='5' pt='1' fontSize='xl'><Text as='b'>zoneTwo</Text></Box>
          {/*LogIn / LogOut / SignUp button path toggle*/}
           {location.pathname === '/login' && !isLoggedIn.email ?
            <Link to="/signup">
              <SecondaryButton m='5' mr='10'>SignUp</SecondaryButton>
            </Link> : '' }
            {location.pathname === '/signup' && !isLoggedIn.email || location.pathname === '/landing' && !isLoggedIn.email || location.pathname === '/' && !isLoggedIn.email ?
            <Link to="/login">
              <SecondaryButton m='5' mr='10'>Login</SecondaryButton>
            </Link> : '' }
        </Flex>
        :
        <Flex direction='row' justify='space-between' bg='gray.50' h='full'>
          <Box as='div' pl='5' m='5' pt='1' fontSize='xl'><Text as='b'>zoneTwo</Text></Box>  
          {/*LogIn / LogOut / SignUp button path toggle*/}
            <Link to="/login">
              <SecondaryButton m='5' mr='10' onClick={()=> dispatch(logout())}>LogOut</SecondaryButton>
            </Link>
        </Flex>
  
      }
      </Box>
    </div>
  );
}

export default Navbar;