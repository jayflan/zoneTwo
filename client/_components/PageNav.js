import { 
  Box,  Flex, Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const PageNav = (props) => {


  //<------------------------------ hooks ------------------------------>//
  const navigate = useNavigate();
  
  const singleWorkout = useSelector((state) => state.singleWorkout) || [];
  
  const [activeBtn, setActiveBtn] = useState('Overview');

  useEffect(() => {
    if(location.pathname === `/workouts/user/${singleWorkout.id}/analysis`){
      setActiveBtn('Analysis');
    } else {
      setActiveBtn('Overview');
    }
    return function cleanup() {
      document.body.style.backgroundColor = "#071907"; // change background body to black
      document.body.style.backgroundColor = "white";
    }
  });

  //<------------------------------ componentDidMount ------------------------------>//
  //<------------------------------ event & error handling ------------------------------>//

  const handleClick = (e) => {
    e.preventDefault();
    if(e.target.innerText === 'Overview'){
      // setActiveBtn('Overview');
      navigate(`/workouts/user/${singleWorkout.id}`);
    } else if(e.target.innerText === 'Analysis'){
      // setActiveBtn('Analysis');
      navigate(`/workouts/user/${singleWorkout.id}/analysis`);
    }; 
  };


  return(
    <div>
      <Flex direction="column" justifyContent="space-between">
        <h1 data-testid={'test-heading'} hidden={true}>{activeBtn}</h1>
        {/* Navbar/Buttons */}
        <Box className="nav-userworkout" ml={6} mr={6}>
            <Link to={`/workouts/user/${singleWorkout.id}`} >
              <Flex as="button"
                id="overview"
                data-testid="overview-btn"
                className={`btn-useroverview ${activeBtn === 'Overview' ? 'btn-active' : ''}`} 
                p="4" border="1px" borderBottom="0px" borderColor="gray.200"
                onClick={handleClick}
              >
                <Text pr="1em">Overview</Text>
              </Flex>
            </Link>
            <Link to={`/workouts/user/${singleWorkout.id}/analysis`} >
              <Flex as="button"
                id="analysis"
                data-testid="analysis-btn"
                className={`btn-useranalysis ${activeBtn === 'Analysis' ? 'btn-active' : ''}`}
                p="4" border="1px" borderColor="gray.200"
                onClick={handleClick}
              >
                <Text pr="1.5em">Analysis</Text>
              </Flex>
            </Link>
        </Box>
      </Flex>
    </div>
  );

};

export default PageNav;