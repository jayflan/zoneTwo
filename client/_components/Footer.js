import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return(
    <Flex as="div" h='full' mt='5' id="footer" bg="gray.800">
      <Box w='150' m='20'>
        <Text as='b' fontSize='xl' textColor='gray.100'>zoneTwo</Text>
      </Box>
      <Box mt='20' pt='1' pl='20'>
        <Text mb='10' textColor='gray.400'>Menu</Text>
        <Text mb='5' textColor='gray.100' fontSize='sm'>Features</Text>
        <Text mb='5' textColor='gray.100' fontSize='sm'>About</Text>
      </Box>
      <Box mt='20' pt='1' pl='20'></Box>
      <Box mt='20' ml='40' pt='1'>
        <Text mb='10' textColor='gray.400'>Get Started</Text>
        <Text mb='5' textColor='gray.100' fontSize='sm'>Sign Up</Text>
        <Text mb='5' textColor='gray.100' fontSize='sm'>Log In</Text>
      </Box>
    </Flex>
  );
};

export default Footer;