import { Box } from "@chakra-ui/core";
import React from "react";
import { NavBar } from "./Nav/NavBar";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box>{children}</Box>
    </>
  );
};
