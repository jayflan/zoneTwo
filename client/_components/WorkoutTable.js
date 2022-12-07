import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { 
  Box, Button, Container, Flex, ListItem, Text, UnorderedList,
  Table, Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption, TableContainer,
} from "@chakra-ui/react";
import { displayFahrenheit } from "../_functions/logicFrontend";


const WorkoutTable = (props) => {

  const { workout, user } = props;
  const hr = workout.hrAvg;
  const cad = workout.cadAvg; 
  const atemp = workout.tempAvg; 

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
                  <Td fontSize="xs">{`${workout.hrAvg} bpm`}</Td>
                  <Td fontSize="xs">{`${workout.hrMax} bpm`}</Td>
                </Tr>
              ) : ("")
            }

            {cad ? (
              <Tr>
                <Td fontSize="xs">Cadence</Td>
                <Td fontSize="xs">{workout.cadAvg}</Td>
                <Td fontSize="xs">{workout.cadMax}</Td>
              </Tr>
              ) : ("")
            }

            {atemp ? (
              <Tr>
              <Td fontSize="xs">Temperature</Td>
              <Td fontSize="xs">{`${displayFahrenheit(workout.tempAvg)} F`}</Td>
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