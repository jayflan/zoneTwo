import { Button, chakra } from "@chakra-ui/react";

const PrimaryButton = chakra(Button, {
    // Styles for the base style
    baseStyle: {
        shadow: "sm",
        rounded: "sm",
        bg: "gray.200"
    },
    // Styles for the size variations
    // sizes: {},
    // // Styles for the visual style variations
    // variants: {},
    // // The default `size` or `variant` values
    // defaultProps: {},
});

export default PrimaryButton;