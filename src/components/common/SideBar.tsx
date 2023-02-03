import type { IconType } from "react-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Icon, Button, Flex } from "@chakra-ui/react";
import { FiBook, FiStar } from "react-icons/fi";

interface SidebarMenu {
  label: string;
  icon: IconType;
  pathname: string;
}

export default function SideBar() {
  const router = useRouter();

  const [currentPathname, setCurrentPathname] = useState<string | null>(null);

  const sidebarMenus: SidebarMenu[] = [
    {
      label: "All",
      icon: FiBook,
      pathname: "/",
    },
    {
      label: "Favorite",
      icon: FiStar,
      pathname: "/favorite",
    },
  ];

  useEffect(() => {
    if (router.isReady) {
      setCurrentPathname(router.pathname);
    }
  }, [router.isReady, router.pathname]);

  return (
    <Flex
      pos={{
        base: "static",
        lg: "sticky",
      }}
      top={4}
      direction="column"
      gap={4}
      w="full"
    >
      {sidebarMenus.map((sidebarMenu, index) => (
        <Button
          key={index}
          as={NextLink}
          justifyContent="flex-start"
          w="full"
          href={sidebarMenu.pathname}
          leftIcon={<Icon as={sidebarMenu.icon} />}
          {...(currentPathname === sidebarMenu.pathname
            ? { variant: "capsuleSolid", colorScheme: "primary" }
            : { variant: "capsuleOutline" })}
        >
          {sidebarMenu.label}
        </Button>
      ))}
    </Flex>
  );
}
