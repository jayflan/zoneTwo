// import { Box, Center, Divider, Flex, VStack, Image, Text, Button, Input } from "@chakra-ui/react";
import { Box, Center, Divider, Flex, FormControl, VStack, Image, Text, Button, Input, chakra } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../styles/index";
import { auth, authenticate, me } from "../../_store/auth";
import { DateTime, wrkoutDist, wrkoutElevGain, hrsMinsSecs, meterToFeet } from "../../_functions/measurementFuncs";

const WorkoutCard = (props) => {
  
  //<------------------------------ hooks or props ------------------------------>//
  
  const { workout, userEmail } = props;

  //measurement functions and calcs found here
  let startTime = ""; // timestamp creation
  const workoutData = workout.data[0] || [];
  workoutData ? startTime = workoutData.time : "";
  const dateTime = new DateTime(startTime);
  const workoutTimeStamp = `${dateTime.monthName()} ${dateTime.dateNum()}, ${dateTime.dateFullYear()} at ${dateTime.dateTime()}`;
  const workoutLength = hrsMinsSecs(workout); // workout length (hrs/min/sec)

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
      <Card>
        <Flex direction='row' alignItems='center' m='1'>
          <Box>
            <Box p={2}>
              <div><Text as='b' fontSize='md'>{userEmail}</Text></div>
              <div>
                <Text as={textSmall}>
                  {/*display nothing if no time data exists */
                  startTime ? workoutTimeStamp : ""
                  }
                </Text>
              </div>
            </Box>
            <Box as='h2' m={2}>
              <Text as='b' fontSize='xl'>{workout.name}</Text>
            </Box>
            <Flex mb= {6} p={2}>
              <Box pb={2}>
                <Box><Text as={textSmall}>Distance</Text></Box>
                <Box><Text as='b' fontSize='xl'>{wrkoutDist(workout, 'miles')}</Text></Box>
              </Box>
              <Box as={vertLineGray}/>
              <Box pb={2}>
                <Box><Text as={textSmall}>Elev Gain</Text></Box>
                <Box><Text as='b' fontSize='xl'>{wrkoutElevGain(workout, 'feet')}</Text></Box>
              </Box>
              <Box as={vertLineGray}/>
              <Box pb={2}>
                <Box><Text as={textSmall}>Time</Text></Box>
                <Box>
                  <Text as='b' fontSize='xl'>
                  {`
                    ${workoutLength.hours} hr
                    ${workoutLength.minutes} m
                  `}
                  </Text>
                </Box>
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