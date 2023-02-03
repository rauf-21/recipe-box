import type { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface StepListItemContentProps {
  children: ReactNode;
}

export default function StepListItemContent({
  children,
}: StepListItemContentProps) {
  return (
    <Box
      ml={5}
      pl={5}
      py={2}
      borderLeftWidth={2}
      borderLeftColor="gray.200"
    >
      {children}
    </Box>
  );
}
