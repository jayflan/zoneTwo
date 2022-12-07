import { Box, chakra, Center, Divider, Flex, FormControl, VStack, Image, Text, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../styles/index";
import { DateTime } from "../../_functions/logicFrontend"

const InfoCard = (props) => {
  
  //<------------------------------ hooks or props ------------------------------>//

  const { workouts, userEmail } = props; 
  const frstWrkout = workouts[0] || [];
  const frstWrkoutData = frstWrkout.data || [];
  let frstWrkoutTime = "";
  if(frstWrkoutData.length > 2) frstWrkoutTime = frstWrkoutData[0].time || [];
  
  //measurement functions and calcs found here
  let startTime = ""; // timestamp creation
  let workoutTimeStamp = "";
  if(frstWrkoutTime) {
    startTime = frstWrkoutTime;
    const dateTime = new DateTime(startTime);
    workoutTimeStamp = `${dateTime.monthName()} ${dateTime.dateNum()}, ${dateTime.dateFullYear()}`;
  }
  

  //<------------------------------ event & error handling ------------------------------>//



  //<------------------------------ styling ------------------------------>//

  const Card = chakra('div', {
    baseStyle: {
      shadow: 'lg',
      rounded: 'sm',
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
              <div><Text as='b' fontSize='md'>{userEmail}</Text></div>
            </Box>
            <Flex p={2}>
              <Flex direction='column' alignItems='center'>
                <Box><Text as={textSmall}>Activities</Text></Box>
                <Box><Text as='b' fontSize='xl'>{workouts.length}</Text></Box>
              </Flex>
            </Flex>
            <Box as='hr' m={2} pb={2} color='grey.500' w='10em'></Box>
        </Flex>
        <Flex p='2' direction='column'>
          <Box><Text as={textSmall}>Latest Activity</Text></Box>
          <Box>
              <div><Text as='b' fontSize='md'>{frstWrkout.name}</Text></div>
          </Box>
          <Box>
              <div><Text fontSize='sm'>{workoutTimeStamp}</Text></div>
          </Box>
        </Flex>
      </Card>
    </div>
  );
};
  
export default InfoCard;