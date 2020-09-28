import { Input, Flex, Button, IconButton } from "@chakra-ui/core";
import React from "react";

const SearchBox: React.FC = () => {
  return (
    <Flex mx={1} flexGrow={1}>
      <Input rounded="false" ml={1} w="100%" mt="auto" mb="auto"></Input>
      <IconButton
        aria-label="search"
        icon="search"
        background="#a9e1ef"
        mt="auto"
        mb="auto"
        mr={1}
        rounded="false"
        roundedRight="true"
      ></IconButton>
    </Flex>
  );
};
export default SearchBox;
