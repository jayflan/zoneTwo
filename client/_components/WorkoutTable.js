import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { 
  Box, Button, Container, Flex, ListItem, Text, UnorderedList,
  Table, Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption, TableContainer,
} from "@chakra-ui/react";


const WorkoutTable = () => {

  //<----- hooks ----->
  const workout = useSelector((state) => (state.singleWorkout.data)) || [];
  const gpxDataObj = workout[0];
  const hr = gpxDataObj?.hr;
  const cad = gpxDataObj?.cad; 
  const atemp = gpxDataObj?.atemp; 

  return(
    <div>
      <TableContainer mt="2">
        <Table size="sm" variant="unstyled">
          <Thead>
            <Tr>
              <Th></Th>
              <Th fontSize="2xs">Avg</Th>
              <Th fontSize="2xs">Max</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td fontSize="xs">Speed</Td>
              <Td fontSize="xs">6.7mi/h</Td>
              <Td fontSize="xs">15.2mi/h</Td>
            </Tr>
            
            {hr ? (
                <Tr>
                  <Td fontSize="xs">Heart Rate</Td>
                  <Td fontSize="xs">182bpm</Td>
                  <Td fontSize="xs">191bpm</Td>
                </Tr>
              ) : ("")
            }

            {cad ? (
              <Tr>
                <Td fontSize="xs">Cadence</Td>
                <Td fontSize="xs">76</Td>
                <Td fontSize="xs">128</Td>
              </Tr>
              ) : ("")
            }

            {atemp ? (
              <Tr>
              <Td fontSize="xs">Temperature</Td>
              <Td fontSize="xs">81F</Td>
            </Tr>  
              ) : ("")
            }
            
          </Tbody>
        </Table>
      </TableContainer> 
    </div>
  );
}

export default WorkoutTable;