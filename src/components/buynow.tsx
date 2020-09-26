import { Button, Stack, Text } from "@chakra-ui/core";
import { useState } from "react";

export const BuyNow: React.FC = () => {
  const [buying, setBuying] = useState(false);
  const onClickHandler = () => {};
  return (
    <Stack p="10px" border="1px solid black" w={["100%", "100%", "250px"]}>
      <Text mx="auto" fontSize="2xl">
        $3.99
      </Text>
      <Button onClick={onClickHandler} isLoading={buying} mx="auto" w="200px">
        Buy Now
      </Button>
    </Stack>
  );
};

export default BuyNow;
