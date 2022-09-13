import { Button, chakra } from "@chakra-ui/react";

const SecondaryButton = chakra(Button, {
    // Styles for the base style
    baseStyle: {
        shadow: "sm",
        rounded: "sm",
        bg: "orange"
    },
    // Styles for the size variations
    // sizes: {},
    // // Styles for the visual style variations
    // variants: {},
    // // The default `size` or `variant` values
    // defaultProps: {},
});

export default SecondaryButton;