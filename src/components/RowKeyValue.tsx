import { Divider, Flex, Heading, Skeleton, Text } from "@chakra-ui/core";
import React from "react";

export type RowKeyValueProps = {
  title: string;
  value?: string;
  isLoaded?: boolean;
};

export const RowKeyValue: React.FC<RowKeyValueProps> = ({
  title,
  value,
  isLoaded,
}) => {
  return (
    <>
      <Flex>
        <Text>{title}</Text>
        <Skeleton ml="auto" isLoaded={isLoaded}>
          <Heading size="lg">{"" + value}</Heading>
        </Skeleton>
      </Flex>
      <Divider />
    </>
  );
};

export default RowKeyValue;
