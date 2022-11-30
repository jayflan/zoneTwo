import { Box, Flex, Text } from "@chakra-ui/react";
import React, {useEffect} from "react";

const UserWorkout = () => {

  //<------------------------------ hooks ------------------------------>//
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return function cleanup() {
      document.body.style.backgroundColor = "#071907"; // change background body to black
    }
  },[]);

  //<------------------------------ componentDidMount ------------------------------>//
  //<------------------------------ event & error handling ------------------------------>//

  return(
    <div>
      <Flex border="1px" borderColor="black" pt={28}>
        {/* Navbar/Buttons */}
        <Box as="nav" ml={6} mr={6}>
          <Flex p="4" border="1px" borderColor="gray.200">
            <Text>Overview</Text>
            <Box width="10"></Box>
          </Flex>
          <Box>
            <Text p="4" border="1px" borderColor="gray.200">Analysis</Text>
          </Box>
        </Box>
        {/* Overview, Map, Graphs */}
        <Box flexGrow="1" mr={6} border="1px" borderColor="blue">
          <Box border="1px" borderColor="Green">Name Info</Box>
          <Box border="1px" borderColor="Green">Overview Info</Box>
          <Box mt={6} border="1px" borderColor="Green">Map</Box>
          <Box border="1px" borderColor="Green">Graph</Box>
        </Box>
      </Flex>
      {/* Footers */}
      <Box mt={20} border="1px" borderColor="Green">Footer Activities</Box>
      <Box border="1px" borderColor="Green">Footer About</Box>
    </div>
  )
}

export default UserWorkout;