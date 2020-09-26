import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/core";
import React from "react";

export type NavMenuProp = { text: string };

export const NavMenu: React.FC<NavMenuProp> = ({ text, children }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        mt="auto"
        mb="auto"
        border="false"
        height="100%"
        rightIcon="chevron-down"
        fontWeight={0}
      >
        {text}
      </MenuButton>
      <MenuList>{children}</MenuList>
    </Menu>
  );
};

export default NavMenu;
