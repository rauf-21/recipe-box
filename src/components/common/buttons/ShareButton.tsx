import type { ReactNode } from "react";
import type { ButtonProps } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  useToast,
  Alert,
  Button,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FiShare2, FiCopy, FiAlertCircle } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";

interface ShareOptionButtonProps extends ButtonProps {
  icon: ReturnType<typeof Icon>;
  children: ReactNode;
}

function ShareOptionButton({
  icon,
  children,
  ...props
}: ShareOptionButtonProps) {
  return (
    <Button
      flexDir="column"
      gap={1}
      display="flex"
      py={8}
      {...props}
    >
      {icon}
      {children}
    </Button>
  );
}

function CopyLinkButton() {
  const toast = useToast({
    position: "top",
  });

  function handleCopyLinkButtonClick() {
    const link = window.location.href;

    window.navigator.clipboard.writeText(link);

    toast({
      render: () => {
        return (
          <Alert
            bg="gray.100"
            rounded="md"
          >
            <Text
              alignItems="center"
              gap={2}
              display="flex"
            >
              <Icon
                as={FiAlertCircle}
                boxSize={6}
              />
              Text Copied Successfully !
            </Text>
          </Alert>
        );
      },
    });
  }

  return (
    <ShareOptionButton
      icon={<Icon as={FiCopy} />}
      onClick={handleCopyLinkButtonClick}
    >
      Copy Link
    </ShareOptionButton>
  );
}

function ShareToFacebookButton() {
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    setLink(window.location.href);
  }, []);

  return (
    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
      target="_blank"
      rel="noreferrer"
    >
      <ShareOptionButton
        icon={
          <Icon
            as={FaFacebook}
            color="blue.500"
          />
        }
      >
        Facebook
      </ShareOptionButton>
    </a>
  );
}

export default function ShareButton() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button leftIcon={<Icon as={FiShare2} />}>Share</Button>
      </PopoverTrigger>
      <PopoverContent w="max">
        <PopoverArrow />
        <PopoverBody>
          <Flex gap={2}>
            <CopyLinkButton />
            <ShareToFacebookButton />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
