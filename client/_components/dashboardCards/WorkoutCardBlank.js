import { AspectRatio, Box, Center, Divider, Flex, FormControl, VStack, Image, Text, Button, Input, chakra } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Map from "../Map.js";
// import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { DateTime, displayMilesOrKilos, displayFeetOrMeters, getLatLonArr } from "../../_functions/logicFrontend";

const WorkoutCardBlank = (props) => {
  
  //<------------------------------ hooks or props ------------------------------>//
  
  const { user } = props;
  const userEmail = user?.email;
  const userDistUnit = user?.distUnit;
  // const workoutLength = workout?.time;
  //measurement functions and calcs found here
  let startTime = ""; // timestamp creation
  // const firstTrkPt = workout.data[0] || [];
  // firstTrkPt ? startTime = firstTrkPt.time : "";
  // const dateTime = new DateTime(startTime);
  // const workoutTimeStamp = `${dateTime.monthName()} ${dateTime.dateNum()}, ${dateTime.dateFullYear()} at ${dateTime.dateTime()}`;
  // const workoutLength = hrsMinsSecs(workout); // workout length (hrs/min/sec)
  

  //<------------------------------ event & error handling ------------------------------>//


  //<------------------------------ styling ------------------------------>//

  const Card = chakra('div', {
    baseStyle: {
      shadow: 'lg',
      rounded: 'sm',
      bg: 'white',
      marginBottom: '1em'
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

  
//<------------------------------ render ------------------------------>//

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
            <Flex direction='column' as='h2' m={2} pb={4}>
              <Text as='b' fontSize='xl'>Thank you for joining zoneTwo!</Text>
              <Text as='b' fontSize='xl'>Please upload your first workout.</Text>
            </Flex>
            <Box as='hr' m={2} pt={4} pb={2} color='grey.500' w='30em'></Box>
          </Box>            
        </Flex>
      </Card>
    </div>
  );
};
  
  

export default WorkoutCardBlank;