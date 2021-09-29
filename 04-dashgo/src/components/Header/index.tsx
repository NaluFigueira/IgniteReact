import { Flex, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
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
      <Logo />

      {isLargeResolution && <SearchBox />}

      <Flex align="center" ml="">
        <NotificationsNav />
        <Profile showUserNameAndEmail={isLargeResolution} />
      </Flex>
    </Flex>
  );
}
