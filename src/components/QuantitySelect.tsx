import { Text, Box, Flex, Select } from "@chakra-ui/core";
import * as React from "react";

interface IQuantitySelectProps {}

const QuantitySelect: React.FunctionComponent<IQuantitySelectProps> = () => {
  const opts = [];
  for (let i = 1; i < 100; i++) {
    opts.push(<option>{i}</option>);
  }

  return (
    <Flex my={2}>
      <Text my="auto" mr={3}>
        Quantity
      </Text>
      <Select>{opts}</Select>
    </Flex>
  );
};

export default QuantitySelect;
