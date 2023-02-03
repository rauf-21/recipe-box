import type { LinkProps } from "@chakra-ui/react";
import { Link, Icon } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

interface ExternalLinkProps extends LinkProps {}

export default function ExternalLink({
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <Link
      fontWeight="bold"
      isExternal
      {...props}
    >
      {children}
      <Icon
        as={FiExternalLink}
        ml={1}
      />
    </Link>
  );
}
