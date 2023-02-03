import NextImage from "next/image";

import { Flex, Text } from "@chakra-ui/react";

export default function NoData() {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      gap={10}
      w="full"
    >
      <NextImage
        width={200}
        height={200}
        alt="no data"
        src="/images/no-data.svg"
      />
      <Text
        fontSize="xl"
        fontWeight="bold"
      >
        No Data
      </Text>
    </Flex>
  );
}
