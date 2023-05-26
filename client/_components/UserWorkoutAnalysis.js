import { 
  Box, Button, Center, Container, Flex, ListItem, Text, UnorderedList,
} from "@chakra-ui/react";
import PrimaryButton from "./styles/PrimaryButton"
import React, { useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Newscard from "./dashboardCards/NewsCard";
import WorkoutTable from "./WorkoutTable";
import { useDispatch } from "react-redux";
import { getSingleWorkout } from "../_store/singleWorkout";
import { getUserWorkouts } from "../_store/workouts";
import { useHistory, useParams } from "react-router-dom";
import { DateTime, displayFeetOrMeters, displayMilesOrKilos } from "../_functions/logicFrontend";
import Map from "./Map";
import AreaChartHR  from "./AreaChartHR";
import AreaChartElev from "./AreaChartElev";
import AreaChartSpeed from "./AreaChartSpeed";

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

  // change Overview/Analysis color when hovered over
  // const handleBtnOverview  = (e) => {
  //   e.preventDefault();
  //   document.querySelector(".btn-useroverview").style = {
  //     borderLeftColor: "orange",
  //     borderLeft: "4px",
  //   };
  //   console.log('Show Overview');
  // };

  // const handleBtnAnalysis  = (e) => {
  //   e.preventDefault();
  //   overviewBtn ? setOverviewBtn(false) : "";
  //   document.querySelector(".btn-useranalysis").style = {
  //     borderLeftColor: "orange",
  //     borderLeft: "4px",
  //   };
  //   console.log('Show Overview');
  // };

  // console.log(overviewBtn);

  return(
    <div>
      <Flex direction="column" justifyContent="space-between" h="100vh">
        <Flex pt={28}>
          {/* Navbar/Buttons */}
          <Box className="nav-userworkout" ml={6} mr={6}>
            <Link to={`/workouts/user/${singleWorkout.id}`}>
              <Flex as="button" className="btn-useroverview" p="4" border="1px" borderBottom="0px" borderColor="gray.200">
                <Text>Overview</Text>
              <Box width="10"></Box>
              </Flex>
            </Link>
            <Link to={`/workouts/user/${singleWorkout.id}/analysis`}>
              <Flex as="button" className="btn-useranalysis" p="4" border="1px" borderColor="gray.200"
                borderLeft="4px" borderLeftColor="orange">
                <Text>Analysis</Text>
                <Box width="12"></Box>
              </Flex>
            </Link>
          </Box>
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
              <AreaChartElev userInfo={ user } singleWorkout={ singleWorkout } targetProp={ "ele" }/>
              <AreaChartHR userInfo={ user } singleWorkout={ singleWorkout } targetProp={ "hr" }/>
              <AreaChartSpeed userInfo={ user } singleWorkout={ singleWorkout } targetProp={ "speed" }/>
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