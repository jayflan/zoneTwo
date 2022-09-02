import React from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

const Navbar = () => {
  return(
    <div className="navbar">
      <Box mb='1' borderBottom='1px' borderBottomColor='gray.400'>
        <Flex direction='row' justify='space-between' bg='gray.50' h='full'>
          <Box as='div' pl='5' m='5' pt='1' fontSize='xl'><Text as='b'>zoneTwo</Text></Box>
          <Button as='button'  m='5' mr='10'>Login</Button>
        </Flex>
      </Box>
    </div>
  );
}

export default Navbar;