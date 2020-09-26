import { Box } from "@chakra-ui/core";
import React from "react";
import { NavBar } from "./NavBar";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box>{children}</Box>
    </>
  );
};
