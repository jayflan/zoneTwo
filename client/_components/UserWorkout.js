import { 
  Box, Button, Center, Container, Flex, ListItem, Text, UnorderedList,
} from "@chakra-ui/react";
import PrimaryButton from "./styles/PrimaryButton"
import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Newscard from "../_components/dashboardCards/NewsCard";
import WorkoutTable from "./WorkoutTable";
import { useDispatch } from "react-redux";
import { getSingleWorkout } from "../_store/singleWorkout";
import { getUserWorkouts } from "../_store/workouts";
import { useHistory, useParams } from "react-router-dom";
import { DateTime, displayFeetOrMeters, displayMilesOrKilos } from "../_functions/logicFrontend";
import Map from "../_components/Map";
import GraphOverview from "./GraphOverview";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";

const UserWorkout = (props) => {


  //<------------------------------ hooks ------------------------------>//
  const dispatch = useDispatch();
  const urlWorkoutId = useParams();

  const singleWorkout = useSelector((state) => state.singleWorkout) || [];
  const userWorkouts = useSelector((state) => state.userWorkouts) || [];
  const user = useSelector((state) => state.auth) || [];
  
  useEffect(() => {
    dispatch(getSingleWorkout(urlWorkoutId.id));
    dispatch(getUserWorkouts());
    document.body.style.backgroundColor = "white";
    return function cleanup() {
      document.body.style.backgroundColor = "#071907"; // change background body to black
    }
  },[urlWorkoutId.id]);

  const userDistUnit = user?.distUnit;
  
  let startTime = ""; // timestamp creation
  let firstTrkPt = singleWorkout?.data;
  firstTrkPt ? firstTrkPt = firstTrkPt[0] : "";
  firstTrkPt ? startTime = firstTrkPt.time : "";
  const dateTime = new DateTime(startTime);
  const workoutTimeStamp = `${dateTime.monthName()} ${dateTime.dateNum()}, ${dateTime.dateFullYear()} at ${dateTime.dateTime()}`;

  

  //<------------------------------ componentDidMount ------------------------------>//
  //<------------------------------ event & error handling ------------------------------>//

  return(
    <div>
      <Flex direction="column" justifyContent="space-between" h="100vh">
        <Flex pt={28}>
          {/* Navbar/Buttons */}
          <Box as="nav" ml={6} mr={6}>
            <Flex p="4" border="1px" borderBottom="0px" borderColor="gray.200">
              <Text>Overview</Text>
              <Box width="10"></Box>
            </Flex>
            <Box>
              <Text p="4" border="1px" borderColor="gray.200">Analysis</Text>
            </Box>
          </Box>
          {/* Overview, Map, Graphs */}
          <Box flexGrow="1" mr={6}>
            <Box border="1px" borderBottom="0px" borderColor="gray.200" bg="gray.50">
              <Text p="4" >
                { singleWorkout.name ? `${user.email} - ${singleWorkout.name}` : ""}
              </Text>
            </Box>
            <Flex justifyContent="center">
              <Box flexGrow="1" border="1px" borderColor="gray.200">
                <Flex direction="column" p="4">
                  <Text variant="textSmall">{workoutTimeStamp}</Text>
                  <Text as="b" fontSize="3xl">{singleWorkout.name}</Text>
                  <Button as={PrimaryButton} w="32" h="6" fontSize="xs" mt="2"> Add a description</Button>
                </Flex>
              </Box>
              <Box flexGrow="1" border="1px" borderColor="gray.200">
                <Container p="4">
                  <Box mb="2">
                    {singleWorkout.data ? (
                      <Flex as="ul" listStyleType="none">
                        <Box as="li" mr="6">
                          <Flex alignItems="baseline">
                            <Text fontSize='3xl' fontFamily="zTwoNumbers">
                              {displayMilesOrKilos(singleWorkout.distance, userDistUnit)} 
                            </Text>
                            {
                              userDistUnit === 'miles' ? 
                                <Box as="abbr" title="miles" textDecoration="none !important" pl="1"  >
                                  <Text fontSize='xl'>mi</Text>
                                </Box> : 
                                <Box as="abbr" title="kilometers" textDecoration="none !important" pl="1"  >
                                  <Text fontSize='xl'>km</Text>
                                </Box> 
                            }
                          </Flex>
                          <Box><Text variant="textSmall">Distance</Text></Box>
                        </Box>
                        <Box as="li">
                          <Box mr="6">
                            <Text fontSize='3xl' fontFamily="zTwoNumbers">{
                              `${singleWorkout.time?.hours}:${singleWorkout.time?.minutes}:${singleWorkout.time?.seconds}`
                            }</Text>
                          </Box>
                          <Box><Text variant='textSmall'>Time</Text></Box>
                        </Box>
                        <Box as="li">
                          <Flex alignItems="baseline">
                            <Text fontSize='3xl' fontFamily="zTwoNumbers">
                              {displayFeetOrMeters(singleWorkout.elevation, userDistUnit)} 
                            </Text>
                              <Box as="abbr" title="feet" textDecoration="none !important" pl="1">
                                ft
                              </Box>
                          </Flex>
                          <Box><Text variant="textSmall">Elevation</Text></Box>
                        </Box>

                      </Flex>
                      ) : ("")}
                  </Box>
                  <Box as="hr" color="gray.300"></Box>
                  <WorkoutTable workout={singleWorkout} user={user}/>
                </Container>
              </Box>
            </Flex>
            <Box mt={6} border="1px" borderBottom="0px" borderColor="gray.200">
              {/* Dispaly map if data latitude point exists */}
              {
                firstTrkPt?.lat ? (
                  <Map workout={ singleWorkout }/>
                ) : ("")
              }
            </Box>
            <Box border="1px" borderColor="gray.200">
              <AreaChart data={ userWorkouts }/>
            </Box>
          </Box>
        </Flex>
        {/* Footers */}
        <Box>
          <Flex mt={20} bg="gray.50">
            <Container mt={10} mb={10}>
              <Text>Your Recent Activities</Text>
              <UnorderedList mb={2} listStyleType="none">
                {userWorkouts.map((currWorkout, idx) => (
                  idx < 6 ? (
                    <Link key={currWorkout.id} to={`/workouts/user/${currWorkout.id}`}>
                      <ListItem  mb={1} fontSize="sm">{currWorkout.name}</ListItem>
                    </Link>
                    ) : ("")
                ))}
              </UnorderedList>
            </Container>
            <Container mt={10} mb={10}><Newscard/></Container>
          </Flex>
          <Box><Footer/></Box>
        </Box>
      </Flex>
    </div>
  )
}

export default UserWorkout;