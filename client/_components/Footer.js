import React from "react";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";

const Footer = () => {
  return(
    <Flex as="div" h='full' id="footer" bg="#071907">
      <Box w='150' m='20'>
        <Text as='b' fontSize='xl' textColor='gray.100'>zoneTwo</Text>
      </Box>
      <HStack mt='20' pb='20'>
        <Box  pt='1' pl='20'>
          <Text mb='10' textColor='gray.400'>Menu</Text>
          <Text mb='5' textColor='gray.100' fontSize='sm'>Features</Text>
          <Text mb='5' textColor='gray.100' fontSize='sm'>About</Text>
        </Box>
        <Box pt='1' pl='20'>
          <Text mb='10' textColor='gray.400'>Get Started</Text>
          <Text mb='5' textColor='gray.100' fontSize='sm'>Sign Up</Text>
          <Text mb='5' textColor='gray.100' fontSize='sm'>Log In</Text>
        </Box>
      </HStack>
    </Flex>
  );
};

export default Footer;