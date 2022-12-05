import { 
  Box, Button, Container, Flex, ListItem, Text, UnorderedList,
  Table, Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption, TableContainer,
} from "@chakra-ui/react";
import PrimaryButton from "./styles/PrimaryButton"
import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import Newscard from "../_components/dashboardCards/NewsCard";
import WorkoutTable from "./WorkoutTable";
import { useDispatch } from "react-redux";
import { getSingleWorkout } from "../_store/singleWorkout";
import { useHistory, useParams } from "react-router-dom";

const UserWorkout = () => {


  //<------------------------------ hooks ------------------------------>//
  const dispatch = useDispatch();
  const urlWorkoutId = useParams();

  const workout = useSelector((state) => state.singleWorkout) || [];
  const user = useSelector((state) => state.auth) || [];
  
  useEffect(() => {
    dispatch(getSingleWorkout(urlWorkoutId.id))
    document.body.style.backgroundColor = "white";
    return function cleanup() {
      document.body.style.backgroundColor = "#071907"; // change background body to black
    }
  },[urlWorkoutId.id]);

  

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
                { workout.name ? `${user.email} - ${workout.name}` : ""}
              </Text>
            </Box>
            <Flex justifyContent="center">
              <Box flexGrow="1" border="1px" borderColor="gray.200">
                <Flex direction="column" p="4">
                  <Text variant="textSmall">10:41 AM on Sunday, November 27, 2022</Text>
                  <Text as="b" fontSize="3xl">{workout.name}</Text>
                  <Button as={PrimaryButton} w="32" h="6" fontSize="xs" mt="2"> Add a description</Button>
                </Flex>
              </Box>
              <Box flexGrow="1" border="1px" borderColor="gray.200">
                <Container p="4">
                  <Box mb="2">
                    <Flex as="ul" listStyleType="none">
                      <Box as="li" mr="6">
                        <Flex alignItems="baseline">
                          <Text fontSize='3xl' fontFamily="zTwoNumbers">
                            2.42 
                          </Text>
                            <Box as="abbr" title="miles" textDecoration="none !important" pl="1"  >
                              mi
                            </Box>
                        </Flex>
                        <Box><Text variant="textSmall">Distance</Text></Box>
                      </Box>
                      <Box as="li">
                        <Box mr="6">
                          <Text fontSize='3xl' fontFamily="zTwoNumbers">21:50</Text>
                        </Box>
                        <Box><Text variant='textSmall'>Time</Text></Box>
                      </Box>
                      <Box as="li">
                      <Flex alignItems="baseline">
                        <Text fontSize='3xl' fontFamily="zTwoNumbers">
                          358 
                        </Text>
                          <Box as="abbr" title="feet" textDecoration="none !important" pl="1">
                            ft
                          </Box>
                      </Flex>
                      <Box><Text variant="textSmall">Elevation</Text></Box>
                      </Box>
                    </Flex>
                  </Box>
                  <Box as="hr" color="gray.300"></Box>
                  <WorkoutTable/>
                </Container>
              </Box>
            </Flex>
            <Box mt={6} border="1px" borderBottom="0px" borderColor="gray.200">Map</Box>
            <Box border="1px" borderColor="gray.200">Graph</Box>
          </Box>
        </Flex>
        {/* Footers */}
        <Box>
          <Flex mt={20} bg="gray.50">
            <Container mt={10} mb={10}>
              <Text>Your Recent Activities</Text>
              <UnorderedList mb={2} listStyleType="none">
                <ListItem mb={1}>Workout #1</ListItem>
                <ListItem mb={1}>Workout #1</ListItem>
                <ListItem mb={1}>Workout #1</ListItem>
                <ListItem mb={1}>Workout #1</ListItem>
                <ListItem mb={1}>Workout #1</ListItem>
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