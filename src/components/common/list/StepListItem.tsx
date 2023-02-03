import type { ReactNode } from "react";
import { ListItem } from "@chakra-ui/react";

interface StepListItemProps {
  children: ReactNode;
}

export default function StepListItem({ children }: StepListItemProps) {
  return (
    <ListItem
      justifyContent="center"
      flexDir="column"
      display="flex"
    >
      {children}
    </ListItem>
  );
}
