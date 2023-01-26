// import { Box, Center, Divider, Flex, VStack, Image, Text, Button, Input } from "@chakra-ui/react";
import { Box, Center, Divider, Flex, FormControl, VStack, Image, Text, Button, Input } from "@chakra-ui/react";
import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./styles/index";
import { auth, authenticate, me } from "../_store/auth";
import { getUserWorkouts } from "../_store/workouts";
import InfoCard from "./dashboardCards/InfoCard";
import NewsCard from "./dashboardCards/NewsCard";
import WorkoutCard from "./dashboardCards/WorkoutCard";
import WorkoutCardBlank from "./dashboardCards/WorkoutCardBlank";
import PageNotFound from "./PageNotFound";

const Dashboard = () => {
  
  //<------------------------------ hooks ------------------------------>//
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth) || [];
  const userWorkouts = useSelector((state) => state.userWorkouts || []);
  
    useEffect(() => {  
      document.body.style.backgroundColor = "#E2E8F0"; // change dashboard background to grey
      dispatch(getUserWorkouts(authUser.id));
      return function cleanup() {
        document.body.style.backgroundColor = "#071907"; // change background body to black
      }    
    }, [authUser]);
    
  //<------------------------------ event & error handling ------------------------------>//

  //<------------------------------ render ------------------------------>//
  
  return(
    <div>
      {userWorkouts.error ? (
        <PageNotFound/>
      ) : (
        <Flex pt="40" justifyContent="center">
          <Box as='span' display={{base: 'none', md: 'block'}}>
            <InfoCard workouts={userWorkouts} userEmail={authUser.email}/>
          </Box>
          <Box pl='4' pr='4'>
            {
              !userWorkouts.length
              ? 
                <WorkoutCardBlank user={authUser}/>
              : 
                userWorkouts.map(workout => (
                  <WorkoutCard key={workout.id} workout={workout} user={authUser}/>
                ))
            }
          </Box>
          <Box display={{base: 'none', lg: 'block' }}>
            <NewsCard/>
          </Box>
        </Flex>
      )}
    </div>
  );
};
  
export default Dashboard;