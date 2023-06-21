import { 
  Box, Button, Container, Flex, ListItem, Text, UnorderedList,
} from "@chakra-ui/react";
import PrimaryButton from "./styles/PrimaryButton"
import React, { useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PageNav from "./PageNav";
import Footer from "./Footer";
import Newscard from "./dashboardCards/NewsCard";
import WorkoutTable from "./WorkoutTable";
import { useDispatch } from "react-redux";
import { getSingleWorkout } from "../_store/singleWorkout";
import { getUserWorkouts } from "../_store/workouts";
import { useParams } from "react-router-dom";
import Map from "./Map";
import AreaChartElev from "./AreaChartElev";
import AreaChartHR from "./AreaChartHR";
import AreaChartSpeed from "./AreaChartSpeed";
import { DateTime } from "../_functions/logicFrontend";
import AreaChartCadence from "./AreaChartCadence";

const UserWorkoutOverview = (props) => {

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

  // const userDistUnit = user?.distUnit;
  
  
  //<------------------------------ evaluations ------------------------------>//
  
  let startTime = ""; // timestamp creation
  let firstTrkPt = singleWorkout?.data;
  firstTrkPt ? firstTrkPt = firstTrkPt[0] : "";
  firstTrkPt ? startTime = firstTrkPt.time : "";
  const dateTime = new DateTime(startTime);
  const workoutTimeStamp = `${dateTime.monthName()} ${dateTime.dateNum()}, ${dateTime.dateFullYear()} at ${dateTime.dateTime()}`;
  
  //<------------------------------ event & error handling ------------------------------>//

  return(
    <div>
      <Flex direction="column" justifyContent="space-between" h="100vh">
        <Flex pt={28}>
          {/* Navbar/Buttons */}
          <PageNav />
          {/* Overview, Map, Graphs */}
          <Box flexGrow="1" mr={6}>
            <Box border="1px" borderBottom="1px" borderColor="gray.200" bg="gray.50">
              <Text p="4" >
                { singleWorkout.name ? `${user.email} - ${singleWorkout.name}` : ""}
              </Text>
            </Box>
            <Box mt={6} border="1px" borderBottom="0px" borderColor="gray.200">
              {/* Dispaly map if data latitude point exists */}
              {
                firstTrkPt?.lat ? (
                  <Map workout={ singleWorkout }/>
                ) : ("")
              }
            </Box>
            <Box border="1px" borderColor="gray.200">
              {/* Display charts based on if data exists in first trackpoint */}
              
              {
                firstTrkPt?.ele ? (
                  <AreaChartElev userInfo={ user } singleWorkout={ singleWorkout } targetProp={ "ele" }/>
                ) : ("")
              }
              {
                firstTrkPt?.hr ? (
                  <AreaChartHR userInfo={ user } singleWorkout={ singleWorkout } targetProp={ "hr" }/>
                ) : ("")
              }
              {
                firstTrkPt?.speed ? (
                  <AreaChartSpeed userInfo={ user } singleWorkout={ singleWorkout } targetProp={ "speed" }/>
                ) : ("")
              }
              {
                firstTrkPt?.cad ? (
                  <AreaChartCadence userInfo={ user } singleWorkout={ singleWorkout } targetProp={ "cad" }/>
                ) : ("")
              }
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

export default UserWorkoutOverview;