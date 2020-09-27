import { Box } from "@chakra-ui/core";
import React from "react";

type WrapperProp = {
  variant?: "wide";
};

export const Wrapper: React.FC<WrapperProp> = ({ children, variant }) => {
  return (
    <Box mt={4} px={5} mx="auto" w="100%" maxW={variant === "wide" ? 900 : 400}>
      {children}
    </Box>
  );
};
