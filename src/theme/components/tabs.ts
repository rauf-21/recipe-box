import { tabsAnatomy } from "@chakra-ui/anatomy";
import { mode } from "@chakra-ui/theme-tools";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const capsule = definePartsStyle((props) => {
  const { colorScheme: c } = props;

  return {
    tab: {
      rounded: "full",
      fontWeight: "bold",
      _selected: {
        bg: mode(`${c}.600`, `${c}.600`)(props),
        color: "white",
      },
    },
    tablist: {
      p: 1,
      w: "max",
      rounded: "full",
      bg: mode("gray.50", "gray.50")(props),
    },
    tabpanel: {
      mt: 2,
      p: 4,
      rounded: "xl",
    },
  };
});

export const tabsTheme = defineMultiStyleConfig({
  variants: {
    capsule,
  },
});
