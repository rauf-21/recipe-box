import type { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

interface StepListItemOrderProps {
  children: ReactNode;
}

export default function StepListItemOrder({
  children,
}: StepListItemOrderProps) {
  return (
    <Flex
      align="center"
      justify="center"
      w={10}
      maxW={10}
      h={10}
      maxH={20}
      color="white"
      fontWeight="bold"
      bg="primary.600"
      rounded="full"
    >
      {children}
    </Flex>
  );
}
