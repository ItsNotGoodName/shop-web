import { Flex, Heading, MenuItem } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import userService from "../../services/userService";
import { useUserSetState, useUserState } from "../../UserContext";
import SearchBox from "../SearchBox";
import { NavItem } from "./NavItem";
import NavMenu from "./NavMenu";

export const NavBar: React.FC = () => {
  const user = useUserState();
  const setUser = useUserSetState();
  const router = useRouter();

  // :TODO Fix crash on pressing enter on menu items
  let body = user ? (
    <>
      <NavMenu text={user.username}>
        <NextLink href="/user">
          <MenuItem>Account</MenuItem>
        </NextLink>
        <NextLink href="/sell">
          <MenuItem>Sell</MenuItem>
        </NextLink>
        <MenuItem
          as="button"
          onClick={() => {
            userService.logout().then(() => {
              setUser(undefined);
              router.push("/");
            });
          }}
        >
          Logout
        </MenuItem>
      </NavMenu>
      <>
        <NavItem href="/cart">Cart</NavItem>
      </>
    </>
  ) : (
    <>
      <NavItem href="/login">Login</NavItem>
      <NavItem href="/register">Register</NavItem>
    </>
  );

  return (
    <Flex mb={4} background="#E09873" zIndex={5} position="sticky" top={0}>
      <Flex>
        <NavItem href="/">
          <Heading as="h4" size="md">
            Home
          </Heading>
        </NavItem>
      </Flex>
      <SearchBox />
      <Flex ml="auto">{body}</Flex>
    </Flex>
  );
};
