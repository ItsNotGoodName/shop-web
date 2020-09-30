import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Stack,
} from "@chakra-ui/core";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { Layout } from "../components/Layout";
import QuantitySelect from "../components/QuantitySelect";
import { Wrapper } from "../components/Wrapper";
import cartService from "../services/cartService";
import { ItemType } from "../types";

type CartType = [
  {
    quantity: number;
    item: ItemType;
  }
];

const Cart: NextPage = () => {
  const [cart, setCart] = useState<CartType>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    cartService.getCart().then(({ errors, cart }) => {
      if (errors) {
      } else {
        setCart(cart);
      }
      setRefresh(false);
    });
  }, [refresh]);

  let body = cart ? (
    cart?.map(({ item, quantity }, index) => (
      <Box key={item.id}>
        <Flex>
          <Flex flexGrow={1} mr={4} wrap="wrap">
            <ItemCard
              w={["100%", "auto"]}
              flexGrow={1}
              username=""
              href={"/item/" + item.id}
              description=""
              height={100}
              price={item.price}
              title={item.title}
            />
            <QuantitySelect
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                const quantity = parseInt(event.target.value);
                cartService
                  .setCart({ itemId: item.id, quantity })
                  .then(({ success }) => {
                    if (success) {
                      setRefresh(true);
                    }
                  });
              }}
              quantity={quantity}
              w={["100%", "150px"]}
            />
          </Flex>
          <Flex>
            <IconButton
              variantColor="red"
              aria-label="Remove item"
              icon="close"
              size="sm"
            />
          </Flex>
        </Flex>
        <Divider />
      </Box>
    ))
  ) : (
    <Spinner mx="auto" />
  );

  return (
    <Layout>
      <Wrapper variant="wide">
        <Stack p={4} border="solid #EEF1F6 1px">
          <Heading size="lg" mb={4}>
            Shopping Cart
          </Heading>
          <Divider />
          {body}
          <Button w="50%" mx="auto">
            Checkout
          </Button>
        </Stack>
      </Wrapper>
    </Layout>
  );
};

export default Cart;
