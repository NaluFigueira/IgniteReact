import React from "react";
import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";
import { RiMenuLine } from "react-icons/ri";

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isLargeResolution = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isLargeResolution && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize={24}
          variant="unstyled"
          onClick={onOpen}
          aria-label="Open navigation"
          mr="2"
        />
      )}

      <Logo />

      {isLargeResolution && <SearchBox />}

      <Flex align="center" ml="">
        <NotificationsNav />
        <Profile showUserNameAndEmail={isLargeResolution} />
      </Flex>
    </Flex>
  );
}
