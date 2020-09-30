import { Flex, FlexProps, Select, Text } from "@chakra-ui/core";
import React from "react";

type IQuantitySelectProps = {
  quantity: number;
} & FlexProps;

const QuantitySelect: React.FunctionComponent<IQuantitySelectProps> = ({
  quantity,
  onChange,
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
      <Select onChange={onChange} my="auto" value={quantity}>
        {opts}
      </Select>
    </Flex>
  );
};

export default QuantitySelect;
