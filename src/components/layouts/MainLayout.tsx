import type { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

import SEO from "@/components/common/SEO";
import NavBar from "@/components/common/NavBar";
import TopLoadingBar from "@/components/common/TopLoadingBar";
import Footer from "@/components/common/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <SEO />
      <TopLoadingBar />
      <NavBar />
      <Box
        w="full"
        maxW="container.xl"
        minH="100vh"
        mx="auto"
        p={4}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
}
