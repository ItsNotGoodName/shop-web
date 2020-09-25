import { Box } from "@chakra-ui/core";
import React from "react";
import { NavBar } from "./navbar";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box>{children}</Box>
    </>
  );
};
