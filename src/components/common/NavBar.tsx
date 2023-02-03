import NextLink from "next/link";
import {
  useDisclosure,
  Flex,
  Link,
  Icon,
  Show,
  IconButton,
  Heading,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import { FaBoxOpen } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import SideBar from "@/components/common/SideBar";

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      justify="space-between"
      gap={4}
      w="full"
      maxW="container.xl"
      mx="auto"
      p={4}
      fontWeight="bold"
    >
      <Link
        as={NextLink}
        alignItems="center"
        gap={2}
        display="flex"
        href="/"
      >
        <Icon
          as={FaBoxOpen}
          boxSize={8}
          color="primary.600"
        />
        Recipe Box
      </Link>
      <Show below="lg">
        <IconButton
          aria-label="menu button"
          icon={<Icon as={FiMenu} />}
          onClick={onOpen}
          variant="outline"
        />
      </Show>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent
          flexDir="column"
          display="flex"
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading size="md">Menu</Heading>
          </DrawerHeader>
          <DrawerBody>
            <SideBar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
