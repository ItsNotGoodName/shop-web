import { Flex, FlexProps, Select } from "@chakra-ui/core";
import React from "react";

type IQuantitySelectProps = {
  quantity: number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
} & FlexProps;

const QuantitySelect: React.FunctionComponent<IQuantitySelectProps> = ({
  quantity,
  onChange,
  ...props
}) => {
  const opts = [];
  for (let i = 99; i > 0; i--) {
    opts.push(<option label={"Qty: " + i} key={i} value={i} />);
  }

  return (
    <Flex {...props}>
      <Select onChange={onChange} my="auto" value={quantity}>
        {opts}
      </Select>
    </Flex>
  );
};

export default QuantitySelect;
