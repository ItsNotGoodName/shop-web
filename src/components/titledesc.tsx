import { Flex, Stack, Text } from "@chakra-ui/core";
import { NextPage } from "next";
export const TitleDesc: NextPage = (props) => {
  return (
    <Stack p="10px" w={["100%", "100%", "auto"]}>
      <Flex>
        <Text mx="auto" fontSize="2xl">
          Toilet Paper
        </Text>
      </Flex>
      <Text>
        LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM
        LOREM IPSUM LOREM IPSUM LOREM IPSUM
      </Text>
    </Stack>
  );
};

export default TitleDesc;
