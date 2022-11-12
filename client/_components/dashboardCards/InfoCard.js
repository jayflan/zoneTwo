import { Box, chakra, Center, Divider, Flex, FormControl, VStack, Image, Text, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../styles/index";
import { auth, authenticate, me } from "../../_store/auth";


const InfoCard = () => {
  
  //<------------------------------ hooks ------------------------------>//

  // const dispatch = useDispatch();
  // const authUser = useSelector((state) => state.auth) || [];
  // const refScrollListen = useRef(null);
  // useEffect(() => {
  //   dispatch(me())
  // }, [!authUser]);
  // useEffect(() => {
  //   const span = refScrollListen.current;
  //   window.addEventListener('scroll', handleScroll)
  // }, [handleScroll]);  
  

  //<------------------------------ event & error handling ------------------------------>//

  // const handleScroll = () => {
  //   const span = refScrollListen.current;
  //   console.log('scrolling:', Math.ceil(span.scrollTop), span)
  // };


  //<------------------------------ styling ------------------------------>//

  const Card = chakra('div', {
    baseStyle: {
      shadow: 'lg',
      rounded: 'lg',
      bg: 'white'
    }
  })

  const textSmall = chakra('div', {
    baseStyle: {
      fontSize: 'xs', 
      color: 'gray.500'
    }
  })

  const vertLineGray = chakra('div', {
    baseStyle: {
      ml: '4',
      mr: '4', 
      borderLeft: '1px', 
      borderColor: 'gray.300'
    }
  })

  
  return(
    <div>
      <Card ml='4'>
        <Flex direction='column' alignItems='center' m='1'>
            <Box p={2}>
              <div><Text as='b' fontSize='md'>jay@gmail.com</Text></div>
            </Box>
            <Flex p={2}>
              <Flex direction='column' alignItems='center'>
                <Box><Text as={textSmall}>Activities</Text></Box>
                <Box><Text as='b' fontSize='xl'>139</Text></Box>
              </Flex>
            </Flex>
            <Box as='hr' m={2} pb={2} color='grey.500' w='10em'></Box>
        </Flex>
        <Flex p='2' direction='column'>
          <Box><Text as={textSmall}>Latest Activity</Text></Box>
          <Box>
              <div><Text as='b' fontSize='md'>Morning Mountain Bike Ride</Text></div>
          </Box>
          <Box>
              <div><Text fontSize='sm'>October 22, 2022</Text></div>
          </Box>
        </Flex>
      </Card>
    </div>
  );
};
  
export default InfoCard;