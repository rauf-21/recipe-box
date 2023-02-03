import { extendTheme } from "@chakra-ui/react";

import { buttonTheme } from "@/theme/components/button";
import { headingTheme } from "@/theme/components/heading";
import { tabsTheme } from "@/theme/components/tabs";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
  },
  styles: {
    global: {
      html: {
        overflowY: "scroll",
      },
      body: {
        minHeight: "100vh",
      },
    },
  },
  fonts: {
    heading: `'Comfortaa', sans-serif`,
    body: `'Nunito', sans-serif`,
  },
  colors: {
    primary: {
      "50": "#fdf3f3",
      "100": "#fbe5e5",
      "200": "#f9cfcf",
      "300": "#f4adad",
      "400": "#eb7e7e",
      "500": "#de5555",
      "600": "#ca3838",
      "700": "#a52a2a",
      "800": "#8d2727",
      "900": "#762626",
    },
  },
  components: {
    Button: buttonTheme,
    Heading: headingTheme,
    Tabs: tabsTheme,
  },
});

export default theme;
