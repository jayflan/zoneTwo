// import { Box, Center, Divider, Flex, VStack, Image, Text, Button, Input } from "@chakra-ui/react";
import { Box, Center, chakra, Divider, Flex, Icon, Text, Button, Input, VisuallyHidden } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../styles/index";
import { auth, authenticate, me } from "../../_store/auth";

import { FaNewspaper } from "react-icons/fa";
import { BsNewspaper} from "react-icons/bs";


const NewsCard = () => {
  
  //<------------------------------ hooks ------------------------------>//

  // const dispatch = useDispatch();
  // const authUser = useSelector((state) => state.auth) || [];

  // useEffect(() => {
  // }, [!authUser]);
  

  //<------------------------------ event & error handling ------------------------------>//


  // const textSmall = chakra('div', {
  //   baseStyle: {
  //     fontSize: 'xs', 
  //     color: 'black'
  //   }
  // })

  return(
    <div>
      <Flex>
        <Icon as={BsNewspaper} mt='2'/>
        <Flex direction='column' pl='2'>
          <Box>
            <Text fontSize="1xl" color="black">
              News 
            </Text>
            <Box mr='4'>
              <Text as='p' w={{md: '30', lg: '60'}} fontSize='xs'>   
                This is the place where you get your news and insights about your workouts.
              </Text>
            </Box>
            <Text as='b' color='orange' fontSize='xs'>   
              View All News
            </Text>
          </Box>
        </Flex>
      </Flex>
      </div>
  );
};
  
  

export default NewsCard;