import { Box } from "@chakra-ui/core";
import React from "react";

export const Wrapper: React.FC = ({ children }) => {
  return (
    <Box mt={4} px={5} mx="auto" w="100%" maxW={400}>
      {children}
    </Box>
  );
};
