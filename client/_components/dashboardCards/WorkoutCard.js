// import { Box, Center, Divider, Flex, VStack, Image, Text, Button, Input } from "@chakra-ui/react";
import { Box, Center, Divider, Flex, FormControl, VStack, Image, Text, Button, Input, chakra } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../styles/index";
import { auth, authenticate, me } from "../../_store/auth";


const WorkoutCard = () => {
  
  //<------------------------------ hooks ------------------------------>//

  // const dispatch = useDispatch();
  // const authUser = useSelector((state) => state.auth) || [];

  // useEffect(() => {
  //   dispatch(me())
  // }, [!authUser]);
  

  //<------------------------------ event & error handling ------------------------------>//


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
      <Card>
        <Flex direction='row' alignItems='center' m='1'>
          <Box>
            <Box p={2}>
              <div><Text as='b' fontSize='md'>jay@gmail.com</Text></div>
              <div>
                <Text as={textSmall}>
                  November 6, 2022 at 7:54 AM - Flagler County, Florida
                </Text>
              </div>
            </Box>
            <Box as='h2' m={2}>
              <Text as='b' fontSize='xl'>Morning Ride</Text>
            </Box>
            <Flex mb= {6} p={2}>
              <Box pb={2}>
                <Box><Text as={textSmall}>Distance</Text></Box>
                <Box><Text as='b' fontSize='xl'>1.00 ft</Text></Box>
              </Box>
              <Box as={vertLineGray}/>
              <Box pb={2}>
                <Box><Text as={textSmall}>Elev Gain</Text></Box>
                <Box><Text as='b' fontSize='xl'>25 ft</Text></Box>
              </Box>
              <Box as={vertLineGray}/>
              <Box pb={2}>
                <Box><Text as={textSmall}>Time</Text></Box>
                <Box><Text as='b' fontSize='xl'>30m 25s</Text></Box>
              </Box>
            </Flex>
            <Box as='hr' m={2} pt={4} pb={2} color='grey.500' w='30em'></Box>
          </Box>            
        </Flex>
      </Card>
    </div>
  );
};
  
  

export default WorkoutCard;