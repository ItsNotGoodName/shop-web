import { Button, Flex, Heading, MenuItem, Spinner } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import { UserType } from "../../types";
import { NavItem } from "./NavItem";
import NavMenu from "./NavMenu";
import SearchBox from "../SearchBox";

export const NavBar: React.FC = () => {
  const [user, setUser] = useState<UserType | undefined>();
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLogginOut] = useState<Boolean>(false);
  const router = useRouter();

  useEffect(() => {
    userService
      .me()
      .then((data) => {
        setLoading(false);
        if (data.errors) {
          return;
        }
        setUser(data.user);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  let body;
  if (loading) {
    body = <Spinner mx={4} my="auto" />;
  } else {
    // :TODO Fix crash on pressing enter on menu items
    body = user ? (
      <>
        <NavMenu text="Account">
          <NextLink href="/user">
            <MenuItem>Account</MenuItem>
          </NextLink>
          <NextLink href="/sell">
            <MenuItem>Sell</MenuItem>
          </NextLink>
        </NavMenu>
        <Flex>
          <Button
            variant="ghost"
            rounded="false"
            height="100%"
            fontWeight="0"
            onClick={() => {
              setLogginOut(true);
              userService.logout().then(() => {
                setUser(undefined);
                router.push("/");
              });
            }}
            isLoading={!!loggingOut}
          >
            Logout
          </Button>
        </Flex>
      </>
    ) : (
      <>
        <NavItem href="/login">Login</NavItem>
        <NavItem href="/register">Register</NavItem>
      </>
    );
  }

  return (
    <Flex mb={4} background="#E09873" zIndex={1} position="sticky" top={0}>
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
