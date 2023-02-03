import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const capsuleOutline = defineStyle((props) => {
  const { colorScheme: c } = props;

  const baseStyle = {
    borderWidth: 2,
    borderStyle: "solid",
    rounded: "full",
  };

  if (c === "gray") {
    return {
      ...baseStyle,
      borderColor: mode("gray.200", "gray.200")(props),
      color: mode("black", "black")(props),
      _hover: {
        bg: mode("gray.100", "gray.100"),
      },
    };
  }

  return {
    ...baseStyle,
    borderColor: mode(`${c}.600`, `${c}.600`)(props),
    color: mode(`${c}.600`, `${c}.600`)(props),
  };
});

const capsuleSolid = defineStyle((props) => {
  const { colorScheme: c } = props;

  return {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: `${c}.600`,
    rounded: "full",
    color: "white",
    bg: mode(`${c}.600`, `${c}.600`)(props),
    _hover: {
      borderColor: mode(`${c}.700`, `${c}.700`)(props),
      bg: mode(`${c}.700`, `${c}.700`)(props),
    },
  };
});

export const buttonTheme = defineStyleConfig({
  variants: { capsuleOutline, capsuleSolid },
});
