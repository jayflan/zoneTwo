import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme ({
  
  fonts: {
    zTwoNumbers: "helvetica neue"
  },
  components: {

    Text: {
      variants: {
        textSmall: {
          fontSize: 'xs',
          color: 'gray.500'
        }
      }
    }

  }
  
});

export default theme;