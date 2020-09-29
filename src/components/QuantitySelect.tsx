import { Flex, FlexProps, Select, Text } from "@chakra-ui/core";
import * as React from "react";

type IQuantitySelectProps = {} & FlexProps;

const QuantitySelect: React.FunctionComponent<IQuantitySelectProps> = ({
  ...props
}) => {
  const opts = [];
  for (let i = 1; i < 100; i++) {
    opts.push(<option key={i}>{i}</option>);
  }

  return (
    <Flex {...props}>
      <Text my="auto" mr={4}>
        Quantity
      </Text>
      <Select my="auto">{opts}</Select>
    </Flex>
  );
};

export default QuantitySelect;
