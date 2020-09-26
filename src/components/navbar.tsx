import { Box, Button, Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import userService from "../services/userService";

type UserType = {
  id: number;
  username: string;
  email: string;
};

export const NavBar: React.FC = () => {
  const [user, setUser] = useState<UserType | undefined>();
  const [loggingOut, setLogginOut] = useState<Boolean>(false);
  const router = useRouter();

  useEffect(() => {
    userService
      .me()
      .then((data) => {
        if (data.errors) {
          return;
        }
        setUser(data.user);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <Flex zIndex={1} position="sticky" p={4} top={0}>
      <Flex>
        <NextLink href="/">
          <Link>Home</Link>
        </NextLink>
      </Flex>
      <Flex ml="auto">
        {user ? (
          <>
            <Link ml={4}>{user.username}</Link>
            <Button
              ml={4}
              variant="link"
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
          </>
        ) : (
          <>
            <NextLink href="/login">
              <Link ml={4}>Login</Link>
            </NextLink>
            <NextLink href="/register">
              <Link ml={4}>Register</Link>
            </NextLink>
          </>
        )}
      </Flex>
    </Flex>
  );
};
