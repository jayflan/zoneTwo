import React, { useEffect} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import SecondaryButton from "./styles/SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import { logout, me } from "../_store/auth";
import { setScrollLock } from "../_hooks/useScrollLock";
import ModalUpload from "./modals/ModalUpload";

const Navbar = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const { lockScroll, unlockScroll } = setScrollLock;
  const token = window.localStorage.getItem('token');
  let isLoggedIn = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(me());
  }, []);

  return(
    <div className="navbar">
      <Box as='nav'  position='fixed' w='full' borderBottom='1px' borderBottomColor='gray.400' zIndex='100'> 
      {!isLoggedIn.email
        ? 
        <Flex direction='row' justify='space-between' bg='gray.50' h='full'>
          <Box as='div' pl='5' m='5' pt='1' fontSize='xl'><Text as='b'>zoneTwo</Text></Box>
          {/*LogIn / LogOut / SignUp button path toggle*/}
           {location.pathname === '/login' && !token ?
            <Link to="/signup">
              <SecondaryButton m='5' mr='10'>SignUp</SecondaryButton>
            </Link> : '' }
            {location.pathname === '/signup' && !token || location.pathname === '/landing' && !token || location.pathname === '/' && !token ?
            <Link to="/login">
              <SecondaryButton m='5' mr='10'>Login</SecondaryButton>
            </Link> : '' }
        </Flex>
        :
        <Flex direction='row' justify='space-between' bg='gray.50' h='full'>
          <Box as='div' pl='5' m='5' pt='1' fontSize='xl'><Text as='b'>zoneTwo</Text></Box>
          <Box>
            <ModalUpload/>
            {/*LogIn / LogOut / SignUp button path toggle*/}
            <Link to="/login">
              <SecondaryButton m='5' mr='10' onClick={()=> dispatch(logout())}>LogOut</SecondaryButton>
            </Link>
          </Box>    
          
        </Flex>
  
      }
      </Box>
    </div>
  );
}

export default Navbar;