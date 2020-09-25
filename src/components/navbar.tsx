import { Box, Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";

export const NavBar: React.FC = () => {
  return (
    <Flex zIndex={1} position="sticky" p={4} top={0}>
      <Box>
        <NextLink href="/">
          <Link>Home</Link>
        </NextLink>
        <NextLink href="/login">
          <Link ml={4}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link ml={4}>Register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};
