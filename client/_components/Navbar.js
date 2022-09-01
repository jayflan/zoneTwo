import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const Navbar = () => {
  return(
    <div className="navbar">
      <Box>
        <Flex direction='row' justify='space-between' bg='gray.50'>
          <Box as='div' pl='10'>zoneTwo</Box>
          <Box as='div' pr='10'>Login</Box>
        </Flex>
      </Box>
    </div>
  );
}

export default Navbar;