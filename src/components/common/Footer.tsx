import NextLink from "next/link";
import { Flex, Text, Link, Icon } from "@chakra-ui/react";
import { FaBoxOpen } from "react-icons/fa";

import ExternalLink from "@/components/common/links/ExternalLink";

export default function Footer() {
  return (
    <Flex
      align="center"
      direction="column"
      gap={2}
      mt="auto"
      py={2}
      bg="gray.50"
    >
      <Link
        as={NextLink}
        alignItems="center"
        gap={2}
        display="flex"
        mb={2}
        fontSize="lg"
        fontWeight="bold"
        href="/"
      >
        <Icon
          as={FaBoxOpen}
          boxSize={8}
          color="primary.600"
        />
        Recipe Box
      </Link>
      <Text>
        All recipes are from{" "}
        <ExternalLink href="https://www.themealdb.com/">
          TheMealDB.com
        </ExternalLink>
      </Text>
      <Text>
        Made by{" "}
        <ExternalLink href="https://github.com/rauf-21">rauf-21</ExternalLink>
      </Text>
    </Flex>
  );
}
